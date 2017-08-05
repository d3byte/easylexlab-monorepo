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

userController.login = (req, res) => {
  const { username, password } = req.body;

  db.User.findOne({ username }).then(user => {
    user.verifyPassword(password).then(valid => {
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
    }).catch(err => {
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

userController.updateInfo = (req, res) => {
  const myUser = req.user;
  const {
    name,
    username
  } = req.body;

  const query = {};

  if(name)
    query.name = name;
  if(username)
    query.username = username;
  else if(!name && !username) {
    return res.json({
      changed: false
    });
  }

  db.findByIdAndUpdate(myUser.id, {
    $set: query
  }).then(user => {
    return res.json({
      success: true,
      user
    });
  });
};

userController.verifyPassword = (req, res) => {
  const user = req.user;
  const password = req.body.password;
  db.findById(user.id).then(myUser => {
    myUser.verifyPassword(password).then(valid => {
      return res.json({ valid });
    });
  });
};

userController.changePassword = (req, res) => {
  const user = req.user;
  const newPassword = req.body.newPassword;

  db.findByIdAndUpdate(user.id, {$set: { password: newPassword }})
    .then(myUser => {
      return res.json({ success: true });
    });
};

userController.addGroup = (req, res) => {
  const groupCode = req.body.groupCode;
  const user = req.user;

  db.Group.findOne({ code: groupCode }).then(group => {
    group._students.push(user.id);
    group.save();
    db.User.findByIdAndUpdate(
      user.id,
      { $push: { '_groups': group._id }}).then(user => {
      res.json({ success: true });
    });
  });
};

userController.addResult = (req, res) => {
  const {
    result,
    stackName
  } = req.body;

  const user = req.user;

  const results = {
    stackName,
    result
  };

  db.User.findById(user.id).then(user => {
    user._results.push(results);
    user.save();
    res.json({
      success: true
    });
  }).catch(err => {
    throw err;
  });

};

userController.getNotifications = (req, res) => {
  const user = req.user;

  db.User.findById(user.id).then(user => {
    var notifsToSend = [];
    for(let notification of user.notifications) {
      if(!!notification.seen)
        notifsToSend.push(notification);
    }
    res.json({ notifications: notifsToSend });
  });
};

userController.readNotifs = (req, res) => {
  const user = req.user;

  db.User.findById(user.id).then(user => {
    for(let notification of user.notifications) {
      notification.seen = true;
    }
    user.save();
    res.json({ success: true });
  });
};

export default userController;
