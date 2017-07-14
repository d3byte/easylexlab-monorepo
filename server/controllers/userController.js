import verifyPassword from 'mongoose-bcrypt';
import jwt from 'jsonwebtoken';
import secret from './../secret';

import db from './../models';

const userController = {};

userController.post = (req, res) => {
  const {
    name,
    username,
    email,
    password,
    permissions,
    group,
    school
  } = req.body;

  db.findOne({username}, (err, user) => {
    if(err)
      throw err;
    else if(user)
      res.json({success: false});
    else {
      const user = new db.User({
        name,
        username,
        email,
        password,
        permissions,
        _groups: group,
        school
      });

      user.save().then((newUser) => {
        res.status(200).json({
          success: true,
          data: newUser
        });
      }).catch((err) => {
        res.status(500).json({
          message: err
        });
      });
    }
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

export default userController;
