import jwt from 'jsonwebtoken';
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
    groupId
  } = req.body;

  // TODO: use lodash to refactor the code

  const user = req.user;

  if(user.permissions == "teacher") {

    var length = helper.count(tasks);
    var indexes = helper.randomIndexes(length);
    var checked = helper.checkContents(tasks);

    if(checked) {
      var test = [];
      for(var task of tasks) {
        for(var pair of task.content) {
          for(let ind of indexes) {
            if(task.content.indexOf(pair) == ind) {
              test.push(pair);
              break;
            }
          }
        }
      }

      const stack = new db.Stack({
        name,
        tasks,
        test,
        timeToDo,
        _group: groupId
      });
      console.log(stack);
      stack.save().then(stack => {
        res.status(200).json({
          success: true,
          stack
        });
      }).catch(err => {
        res.status(500).json({err: 'lel'});
      });
    } else res.status(502).json({'allFilled': false});

  } else res.status(501).json({'error':'No permissions for this action'});

};

// Get stacks of one exact group
stackController.getTests = (req, res) => {
  const groupId = req.body.groupId;
  const user = req.user;
  if(user.permissions == 'teacher' || user.permissions == 'admin' || user.permissions == 'student') {
    db.Stack.find({_group: groupId}).populate({ path: '', select: 'name tasks test timeToDo' }).then(stacks => {
      res.status(200).json({ stacks });
    }).catch(err => {
      res.status(500).json({ err });
    });
  } else res.status(501).json({'error':'No permissions for this action'});
};

// Get one exact stack
stackController.getTest = (req, res) => {
  const testId = req.body.testId;
  const user = req.user;
  if(user.permissions == 'teacher' || user.permissions == 'admin' || user.permissions == 'student') {
    db.Stack.findById(testId).populate({ path: '', select: 'name tasks test timeToDo' }).then(stack => {
      res.status(200).json({ stack });
    }).catch(err => {
      res.status(500).json({ err });
    });
  } else res.status(501).json({'error':'No permissions for this action'});
};

// Add result to the stack
stackController.addResult = (req, res) => {
  const {
    result,
    stackId
  } = req.body;

  const user = req.user;

  const results = {
    'userId': user.id,
    'username': user.username,
    'result': result
  };

  console.log('Result:\n', results);
  console.log('\n\nstackId: ', stackId);

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
