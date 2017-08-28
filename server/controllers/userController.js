import { verifyPassword, encryptPassword } from 'mongoose-bcrypt';
import jwt from 'jsonwebtoken';
import secret from './../secret';
import helper from './helperFunctions';
import nodemailer from 'nodemailer';

import db from './../models';

const userController = {};

userController.post = (req, res) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        permissions,
        groupCode,
        school,
        city
    } = req.body;

    db.User.findOne({username}, (err, user) => {
        if (err)
            throw err;
        else if (user)
            return res.json({error: 'Данный логин уже занят'});
        else {
            db.User.findOne({email}, (err, user) => {
                if (err)
                    throw err;
                else if (user)
                    res.json({error: 'Данная электронная почта уже занята'});
                else {
                    if (!!groupCode.length) {
                        db.Group.findOne({code: groupCode}).then(group => {
                            const user = new db.User({
                                firstName,
                                lastName,
                                username,
                                email,
                                password,
                                permissions,
                                _groups: [group._id],
                                school,
                                city
                            });
                            user.save().then(newUser => {
                                res.status(200).json({
                                    success: true,
                                    userId: newUser._id
                                });
                            }).catch(err => {
                                res.status(500).json({
                                    message: err
                                });
                            });
                        });
                    } else {
                        const user = new db.User({
                            firstName,
                            lastName,
                            username,
                            email,
                            password,
                            permissions,
                            _groups: [],
                            school,
                            city
                        });
                        user.save().then(newUser => {
                            // console.log('Success:\n', newUser);
                            res.status(200).json({
                                success: true,
                                userId: newUser._id
                            });
                        }).catch(err => {
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
    const {username, password} = req.body;

    db.User.findOne({username}).then(user => {
        user.verifyPassword(password).then(valid => {
            if (valid) {
                const token = jwt.sign(
                    {
                        // username: user.username,
                        // name: user.name,
                        // notifications: user.notifications,
                        id: user._id,
                        permissions: user.permissions
                        // groups: user._groups,
                        // school: user.school
                    },
                    secret,
                    {expiresIn: '2 days'}
                );
                res.status(200).json({
                    success: valid,
                    token
                });
            } else {
                res.status(200).json({
                    success: valid
                });
            }
        }).catch(err => {
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
    if (user.permissions == 'student' || user.permissions == 'teacher') {
        db.Group.findById(groupId).then(group => {
            res.json({
                group
            });
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        });
    }
};

userController.updateInfo = (req, res) => {
    const myUser = req.user;
    const {
      firstName,
      lastName,
      username
    } = req.body;

    const query = {};

    if(firstName)
      query.firstName = firstName;
    if(lastName)
      query.lastName = lastName;
    if(username)
      query.username = username;
    else if (!firstName && !lastName) {
        return res.json({
            changed: false
        });
    }

    if(query.username) {
        db.User.findOne({ username: query.username }).then(user => {
          if(user)
            return res.json({error: 'Данный логин уже занят'});
          else {
            db.User.findByIdAndUpdate(myUser.id, {
                $set: query
            }).then(user => {
                return res.json({
                    success: true
                });
            }).catch(err => {
                return res.status(500).json({
                    message: err
                });
            });
          }
        })
    } else {
      db.User.findByIdAndUpdate(myUser.id, {
          $set: query
      }).then(user => {
          return res.json({
              success: true
          });
      }).catch(err => {
          return res.status(500).json({
              message: err
          });
      });
    }
};

userController.verifyPassword = (req, res) => {
    const user = req.user;
    const password = req.body.password;
    db.User.findById(user.id).then(myUser => {
        myUser.verifyPassword(password).then(valid => {
            return res.json({ success: valid });
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        });
    }).catch(err => {
        res.status(500).json({
            message: err
        });
    });
};

userController.changePassword = (req, res) => {
    const user = req.user;
    const newPassword = req.body.newPassword;

    db.User.findByIdAndUpdate(user.id, {$set: {password: newPassword}})
        .then(myUser => {
            return res.json({success: true});
        }).catch((err) => {
          return res.status(500).json({
            message: err
        });
    });
};

userController.addGroup = (req, res) => {
    const groupCode = req.body.groupCode;
    const user = req.user;

    db.Group.findOneAndUpdate({ code: groupCode },
    { $push: {'_students': user.id} }).then(group => {
        db.User.findByIdAndUpdate(
            user.id,
            { $push: {'_groups': group._id }}).then(myUser => {
            res.json({ success: true });
        }).catch(err => {
            res.status(500).json({
                body: err
            });
        });
    }).catch(err => {
      res.status(500).json({
           body: err
      });
    });
};


userController.getNotifications = (req, res) => {
    const user = req.user;

    db.User.findById(user.id).then(myUser => {
        res.json({ notifications: myUser.notifications });
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    });
};

userController.removeNotification = (req, res) => {
    const user = req.user;
    const id = req.body.id;

    db.User.findById(user.id).then(myUser => {
        myUser.notifications = myUser.notifications.filter(notif => notif.id != id);
        let notificationsCopy = myUser.notifications;
        myUser.save();
        res.json({ sucсess: true, notifications: notificationsCopy });
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    });
};

userController.getUser = (req, res) => {
    const user = req.user;

    db.User.findById(user.id)
        .populate({
            path: '_groups',
            model: 'Group',
            populate: {
                path: '_tests',
                model: 'Stack'
            }
        })
        .then(user => {
          return res.json({ user })
        });
};

userController.learnWords = (req, res) => {
  const user = req.user;
  const amount = req.body.amount;

  db.User.findByIdAndUpdate(user.id, { $inc: { wordsLearnt: amount } }).then(success => {
    return res.json({ success: true });
  })
};

userController.recoverPassword = (req, res) => {
  const email = req.body.email;

  db.User.findOne({ email }).then(user => {
    if(!user) {
      return res.json({ success: false })
    }
    const token = jwt.sign(
      {
        id: user._id,
        email
      },
      secret
    );
    let uri = encodeURI(token);
    user.recoverToken = token;
    user.save().then(res => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
          user: 'easylexlab@gmail.com',
          pass: '45aCRawa@hut'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      let HelperOptions = {
        from: '"EasyLexLab" <easylexlab@gmail.com>',
        to: user.email,
        // to: 'easylexlab@gmail.com',
        subject: 'Восстановление пароля',
        text: `Чтобы восстановить пароль, перейдите по этой ссылке: easylexlab.ru/recover/${token}`
      };
      transporter.sendMail(HelperOptions, (error, info) => {
        if(error) {
          console.log(error);
        } else {
          return res.json({ success: true })
        }
      });
    });
  })
};

userController.checkToken = (req, res) => {
  const token = req.body.token;
  db.User.findOne({ recoverToken: token }).then(user => {
    if(user) {
      user.recoverToken = '';
      user.save().then(rr => {
        return res.json({ success: true });
      });
    }
    return res.json({ success: false });
  });
};

export default userController;
