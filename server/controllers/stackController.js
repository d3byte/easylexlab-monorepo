import verifyPassword from 'mongoose-bcrypt';
import jwt from 'jsonwebtoken';
import secret from './../secret';

import db from './../models';

const stackController = {};

function randomIndexes(max) {
  var array = [];
  for(let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * max + 1);
    array.push(index);
  }
  console.log(array);
  return array;
}

function count(array) {
  var length = 0;
  for(var item of array) {
    length += item.content.length;
  }
  length = length / array.length;
  console.log(length);
  return length;
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

    console.log(tasks.length);

    var test = [];
    for(var task of tasks) {
      console.log('Pairs: ');
      for(var pair of task.content) {
        console.log(pair);
        for(let ind of indexes) {
          if(task.content.indexOf(pair) == ind) {
            test.push(pair);
            break;
          }
        }
      }
    }

    console.log('Test:\n', test, '\nLength:', test.length);

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
  } else res.status(501).json({"error":"No permissions for this action"});

};

export default stackController;
