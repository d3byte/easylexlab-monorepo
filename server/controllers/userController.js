import { verifyPassword, encryptPassword } from 'mongoose-bcrypt';
import jwt from 'jsonwebtoken';
import secret from './../secret';
import helper from './helperFunctions';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

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
                                  to: newUser.email,
                                  // to: 'easylexlab@gmail.com',
                                  subject: 'Регистрация на EasyLexLab',
                                  text: `
                                  Вы успешно зарегистрировались на EasyLexLab, ${newUser.firstName} ${newUser.lastName}.

                                  Логин: ${newUser.username}
                                  Пароль: ${password}
                                  `
                                };
                                transporter.sendMail(HelperOptions, (error, info) => {
                                  if(error) {
                                    console.log(error);
                                  } else {
                                    return res.json({ success: true })
                                  }
                                });
                                return res.status(200).json({
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
                          console.log(newUser);
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
                            to: email,
                            // to: 'easylexlab@gmail.com',
                            subject: 'Регистрация на EasyLexLab',
                            text: `Вы успешно зарегистрировались на EasyLexLab, ${firstName} ${lastName}.\n\nЛогин: ${username}\nПароль: ${password}`
                          };
                          transporter.sendMail(HelperOptions, (error, info) => {
                            if(error) {
                              console.log(error);
                            } else {
                              return res.json({ success: true })
                            }
                          });
                          return res.status(200).json({
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
    const { username, password } = req.body;

    db.User.findOne({username}).then(user => {
        user.verifyPassword(password).then(valid => {
            if (valid) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        permissions: user.permissions
                    },
                    secret
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

    db.User.findByIdAndUpdate(user.id, {$set: {password: newPassword, recoverToken: ''}})
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
  const {
    amount,
    stackId,
    userResult,
    pairsLength
  } = req.body;

  db.Stack.findById(stackId).then(stack => {
    let result = stack.results.filter(result => result.userId == user.id);
    if(result[0]) {
      let difference = Math.abs(result[0].result - userResult);
      let newAmount = Math.round(pairsLength * (difference / 100));
      db.User.findByIdAndUpdate(user.id, { $inc: { wordsLearnt: newAmount } }).then(success => {
        return res.json({ success: true });
      })
    } else {
      db.User.findByIdAndUpdate(user.id, { $inc: { wordsLearnt: amount } }).then(success => {
        return res.json({ success: true });
      })
    }
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
      return res.json({ success: true });
    }
    return res.json({ success: false });
  });
};

userController.sendFeedback = (req, res) => {
  const user = req.user;
  const {
    name,
    text,
    email
  } = req.body;

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
    from: `${name} <${email}>`,
    to: 'easylexlab@gmail.com',
    subject: 'Отзыв',
    text: `${name}: ${text}\n${email}`
  };
  transporter.sendMail(HelperOptions, (error, info) => {
    if(error) {
      console.log(error);
    } else {
      return res.json({ success: true })
    }
  });
};

userController.leaveGroup = (req, res) => {
    const user = req.user;
    const groupId = req.body.groupId;
    db.User.findById(user.id).then(myUser => {
        myUser._groups = myUser._groups.filter(group => group != groupId);
        console.log(myUser._groups);
        myUser.save().then(success => {
            res.json({
                success: true
            })
        })
    })
}

userController.getAvatar = (req, res) => {
    const user = req.user;
    const picName = req.body.picName;
    var filePath = `uploads/${picName}`;
    if(user && picName) {
        fs.exists(filePath, exists => {
            if(exists) {
                fs.readFile(filePath, { encoding: "base64" }, (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    let ext = path.extname(filePath);
                    // res.writeHead(200, { 'Content-Type': `image/${ext}` })
                    // res.end(data, 'binary');
                    return res.json({
                        img: data,
                        ext
                    })
                })
            }
        });
    }
}

export default userController;
