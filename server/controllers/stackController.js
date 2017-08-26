import jwt from 'jsonwebtoken';
import _ from 'lodash';
import moment from 'moment';
import secret from './../secret';

import db from './../models';

import helper from './helperFunctions';

const stackController = {};

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
            attempts
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
                  date: moment().format('LL')
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

    const results = {
        userId: user.id,
        username,
        name,
        result
    };

    db.Stack.findById(stackId).then(stack => {
        stack.results.push(results);
        stack.save();
        res.json({
            success: true
        });
    }).catch(err => {
        throw err;
    });
};

export default stackController;
