import jwt from 'jsonwebtoken';
import randomize from 'randomatic';
import _ from 'lodash';
import moment from 'moment';
import secret from './../secret';

import db from './../models';

import helper from './helperFunctions';

const stackController = {};

moment.locale('ru');

// New stack
stackController.post = (req, res) => {
    const {
        name,
        tasks,
        timeToDo,
        groupId,
        attempts
    } = req.body;

    const user = req.user;

    if(user.permissions == "teacher" || user.permissions == "admin") {
        const stack = new db.Stack({
            name,
            tasks,
            timeToDo,
            _group: groupId,
            attempts,
            deadline: moment().add(timeToDo, 'days').format('LL')
        });
        stack.save().then(stack => {
            db.User.findById(user.id).then(userAccount => {
              const notification = {
                  type: 'newTask',
                  authorId: userAccount._id,
                  author: userAccount.firstName + " " + userAccount.lastName,
                  pic: userAccount.picUrl,
                  text: `${userAccount.firstName + " " + userAccount.lastName} создал новое задание.`,
                  seen: false,
                  date: moment().subtract(timeToDo, 'days').format('LL'),
                  id: randomize('0A', 10)
              };
              db.User.update({ _groups: { $in: [groupId] }},
                  { $push: { notifications: notification }}, {
                    multi: true
                  }).then(success => {
                  return res.json({ success: true, stack });
              }).catch(error => {
                  throw error
              });
            })
        }).catch(err => {
            return res.status(500).json({err: 'error'});
        });
    }
};

// Get stacks of one exact group
stackController.getTests = (req, res) => {
    const groupId = req.body.groupId;
    const user = req.user;
    if (user.permissions == 'teacher' || user.permissions == 'admin' || user.permissions == 'student') {
        db.Stack.find({_group: groupId}).populate({
            path: '',
            select: 'name _group tasks results timeToDo'
        }).then(stacks => {
            res.status(200).json({stacks});
        }).catch(err => {
            res.status(500).json({err});
        });
    } else res.status(501).json({'error': 'No permissions for this action'});
};

// Get one exact stack
stackController.getTest = (req, res) => {
    const testId = req.body.testId;
    const user = req.user;
    if (user.permissions == 'teacher' || user.permissions == 'admin' || user.permissions == 'student') {
        db.Stack.findById(testId).populate({path: '', select: 'name tasks results test timeToDo'}).then(stack => {
            res.status(200).json({stack});
        }).catch(err => {
            res.status(500).json({err});
        });
    } else res.status(501).json({'error': 'No permissions for this action'});
};

// Add result to the stack
stackController.addResult = (req, res) => {
    const {
        result,
        stackId,
        name,
        username,
        userId
    } = req.body;

    const user = req.user;

    db.Stack.findById(stackId).populate({
      path: '_group',
      model: 'Group'
    }).then(stack => {
      const results = {
          userId: user.id,
          username,
          name,
          stack: {
            name: stack.name,
            id: stack._id
          },
          groupName: stack._group.name,
          result
      };
      stack.results.push(results);
      stack.save();
      res.json({
          success: true
      });
    }).catch(err => {
        throw err;
    });
};

stackController.updateResult = (req, res) => {
    const {
        result,
        stackId,
    } = req.body;

    const user = req.user;

    $set: { userId: user.id }

    db.Stack.update({
      _id: stackId,
      results: { $elemMatch: { userId: user.id } }
    }, {
      $set: {
        'results.$.result': result
      }
    }).then(success => res.json({ success: true }));

    // db.Stack.findById(stackId).then(stack => {
    //   console.log(stack);
    //   stack.results = stack.results.map(result => {
    //     if(result.userId == user.id)
    //       results.result = result;
    //     return result
    //   });
    //   stack.save();
    //   res.json({
    //       success: true
    //   });
    // }).catch(err => {
    //     throw err;
    // });
};

export default stackController;
