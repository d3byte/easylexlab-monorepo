import verifyPassword from 'mongoose-bcrypt';
import jwt from 'jsonwebtoken';
import secret from './../secret';

import db from './../models';

const stackController = {};

function randomIndexes(max) {
  var array = [];
  if(max != 1) {
    for(let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * max + 1);
      array.push(index);
    }
  } else array.push(0);
  return array;
}

function count(array) {
  var length = 0;
  for(var item of array) {
    length += item.content.length;
  }
  length = length / array.length;
  return length;
}

function checkContents(tasks) {
  var allGood = true;
  for(var task of tasks) {
    if(!allGood)
      break;
    for(var pair of task.content) {
      if(pair.key.trim().length == 0 || pair.value.trim().length == 0) {
        allGood = false;
        break;
      }
    }
  }
  return allGood;
}

stackController.post = (req, res) => {
  const {
    name,
    tasks,
    timeToDo,
    groupId
  } = req.body;

  const user = req.user;

  if(user.permissions == "teacher") {

    var length = count(tasks);
    var indexes = randomIndexes(length);
    var checked = checkContents(tasks);

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

      stack.save().then(stack => {
        res.status(200).json({
          success: true,
          stack
        });
      }).catch(err => {
        res.status(500).json({err});
      });
    } else res.status(502).json({'allFilled': false});

  } else res.status(501).json({'error':'No permissions for this action'});

};

stackController.getTests = (req, res) => {
  const groupId = req.body.groupId;
  const user = req.user;
  if(user.permissions == 'teacher' || user.permissions == 'admin') {
    db.Stack.find({_group: groupId}).populate( {path: '_tests' }).then(stacks => {
      res.status(200).json({stacks});
    }).catch(err => {
      res.status(500).json({err});
    });
  } else res.status(501).json({'error':'No permissions for this action'});
};

export default stackController;
