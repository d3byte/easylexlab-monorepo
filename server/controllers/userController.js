import verifyPassword from 'mongoose-bcrypt';
import jwt from 'jsonwebtoken';
import secret from './../secret';
import helper from './helperFunctions';

import db from './../models';

const userController = {};

userController.post = (req, res) => {
  const {
    name,
    username,
    email,
    password,
    permissions,
    groupCode,
    school
  } = req.body;

  db.User.findOne({ username }, (err, user) => {
    if(err)
      throw err;
    else if(user)
      res.json({ error: 'Даный логин уже занят' });
    else {
      db.User.findOne({email}, (err, user) => {
        if(err)
          throw err;
        else if(user)
          res.json({error: 'Данная электронная почта уже занята'});
        else {
          if(!!groupCode.length) {
            db.Group.findOne({code: groupCode}).then(group => {
              const user = new db.User({
                name,
                username,
                email,
                password,
                permissions,
                _groups: [group._id],
                school
              });
              user.save().then(newUser => {
                console.log('Success:\n', newUser);
                res.status(200).json({
                  success: true,
                  userId: newUser._id
                });
              }).catch(err => {
                console.log('Error:\n', err)
                res.status(500).json({
                  message: err
                });
              });
            });
          } else {
            const user = new db.User({
              name,
              username,
              email,
              password,
              permissions,
              _groups: [],
              school
            });
            user.save().then(newUser => {
              console.log('Success:\n', newUser);
              res.status(200).json({
                success: true,
                userId: newUser._id
              });
            }).catch(err => {
              console.log('Error:\n', err)
              res.status(500).json({
                message: err
              });
            });
          }
        }
      });
    }
  });
};

userController.addGroup = (req, res) => {
  const {
    studentId,
    groupId
  } = req.body;

  const teacher = req.user;

  db.User.findByIdAndUpdate(
    studentId,
    { $push: { '_groups': groupId }},
  ).then(user => {
    res.json({ success: true });
  }).catch(err => {
    throw err;
  });
};

userController.login = (req, res) => {
  const { username, password } = req.body;

  db.User.findOne({username}).then((user) => {
    user.verifyPassword(password).then((valid) => {
      if(valid) {
        console.log('Valid promise');
        const token = jwt.sign(
          {
            username: user.username,
            name: user.name,
            notifications: user.notifications,
            id: user._id,
            permissions: user.permissions,
            groups: user._groups,
            school: user.school
          },
          secret,
          { expiresIn: '2 days' }
      );
      res.status(200).json({
        success: valid,
        token
      });
      } else {
        console.log('Invalid promise');
        res.status(200).json({
          success: valid
        });
      }
    }).catch((err) => {
      console.log('Error');
      res.status(500).json({
        message: err
      });
    });
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
  });
};

userController.getGroups = (req, res) => {
  const user = req.user;
  const groupId = req.body.groupId;
  if(user.permissions == 'student' || user.permissions == 'teacher') {
    db.Group.findById(groupId).then(group => {
      res.json({
        group
      });
    });
  }
};


export default userController;
