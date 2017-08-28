'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongooseBcrypt = require('mongoose-bcrypt');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _secret = require('./../secret');

var _secret2 = _interopRequireDefault(_secret);

var _helperFunctions = require('./helperFunctions');

var _helperFunctions2 = _interopRequireDefault(_helperFunctions);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = {};

userController.post = function (req, res) {
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        username = _req$body.username,
        email = _req$body.email,
        password = _req$body.password,
        permissions = _req$body.permissions,
        groupCode = _req$body.groupCode,
        school = _req$body.school,
        city = _req$body.city;


    _models2.default.User.findOne({ username: username }, function (err, user) {
        if (err) throw err;else if (user) return res.json({ error: 'Данный логин уже занят' });else {
            _models2.default.User.findOne({ email: email }, function (err, user) {
                if (err) throw err;else if (user) res.json({ error: 'Данная электронная почта уже занята' });else {
                    if (!!groupCode.length) {
                        _models2.default.Group.findOne({ code: groupCode }).then(function (group) {
                            var user = new _models2.default.User({
                                firstName: firstName,
                                lastName: lastName,
                                username: username,
                                email: email,
                                password: password,
                                permissions: permissions,
                                _groups: [group._id],
                                school: school,
                                city: city
                            });
                            user.save().then(function (newUser) {
                                // console.log('Success:\n', newUser);
                                res.status(200).json({
                                    success: true,
                                    userId: newUser._id
                                });
                            }).catch(function (err) {
                                console.log('Error:\n', err);
                                res.status(500).json({
                                    message: err
                                });
                            });
                        });
                    } else {
                        var _user = new _models2.default.User({
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            email: email,
                            password: password,
                            permissions: permissions,
                            _groups: [],
                            school: school,
                            city: city
                        });
                        _user.save().then(function (newUser) {
                            // console.log('Success:\n', newUser);
                            res.status(200).json({
                                success: true,
                                userId: newUser._id
                            });
                        }).catch(function (err) {
                            console.log('Error:\n', err);
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

userController.login = function (req, res) {
    var _req$body2 = req.body,
        username = _req$body2.username,
        password = _req$body2.password;


    _models2.default.User.findOne({ username: username }).then(function (user) {
        user.verifyPassword(password).then(function (valid) {
            if (valid) {
                var token = _jsonwebtoken2.default.sign({
                    // username: user.username,
                    // name: user.name,
                    // notifications: user.notifications,
                    id: user._id,
                    permissions: user.permissions
                    // groups: user._groups,
                    // school: user.school
                }, _secret2.default, { expiresIn: '2 days' });
                res.status(200).json({
                    success: valid,
                    token: token
                });
            } else {
                console.log('Invalid promise');
                res.status(200).json({
                    success: valid
                });
            }
        }).catch(function (err) {
            res.status(500).json({
                message: err
            });
        });
    }).catch(function (err) {
        res.status(500).json({
            message: err
        });
    });
};

userController.getGroups = function (req, res) {
    var user = req.user;
    var groupId = req.body.groupId;
    if (user.permissions == 'student' || user.permissions == 'teacher') {
        _models2.default.Group.findById(groupId).then(function (group) {
            res.json({
                group: group
            });
        }).catch(function (err) {
            res.status(500).json({
                message: err
            });
        });
    }
};

userController.updateInfo = function (req, res) {
    var myUser = req.user;
    var _req$body3 = req.body,
        firstName = _req$body3.firstName,
        lastName = _req$body3.lastName,
        username = _req$body3.username;


    var query = {};

    if (firstName) query.firstName = firstName;
    if (lastName) query.lastName = lastName;
    if (username) query.username = username;else if (!firstName && !lastName) {
        return res.json({
            changed: false
        });
    }

    if (query.username) {
        _models2.default.User.findOne({ username: query.username }).then(function (user) {
            if (user) return res.json({ error: 'Данный логин уже занят' });else {
                _models2.default.User.findByIdAndUpdate(myUser.id, {
                    $set: query
                }).then(function (user) {
                    return res.json({
                        success: true
                    });
                }).catch(function (err) {
                    return res.status(500).json({
                        message: err
                    });
                });
            }
        });
    } else {
        _models2.default.User.findByIdAndUpdate(myUser.id, {
            $set: query
        }).then(function (user) {
            return res.json({
                success: true
            });
        }).catch(function (err) {
            return res.status(500).json({
                message: err
            });
        });
    }
};

userController.verifyPassword = function (req, res) {
    var user = req.user;
    var password = req.body.password;
    _models2.default.User.findById(user.id).then(function (myUser) {
        myUser.verifyPassword(password).then(function (valid) {
            return res.json({ success: valid });
        }).catch(function (err) {
            res.status(500).json({
                message: err
            });
        });
    }).catch(function (err) {
        res.status(500).json({
            message: err
        });
    });
};

userController.changePassword = function (req, res) {
    var user = req.user;
    var newPassword = req.body.newPassword;

    _models2.default.User.findByIdAndUpdate(user.id, { $set: { password: newPassword } }).then(function (myUser) {
        return res.json({ success: true });
    }).catch(function (err) {
        return res.status(500).json({
            message: err
        });
    });
};

userController.addGroup = function (req, res) {
    var groupCode = req.body.groupCode;
    var user = req.user;

    _models2.default.Group.findOneAndUpdate({ code: groupCode }, { $push: { '_students': user.id } }).then(function (group) {
        _models2.default.User.findByIdAndUpdate(user.id, { $push: { '_groups': group._id } }).then(function (myUser) {
            res.json({ success: true });
        }).catch(function (err) {
            res.status(500).json({
                body: err
            });
        });
    }).catch(function (err) {
        res.status(500).json({
            body: err
        });
    });
};

userController.getNotifications = function (req, res) {
    var user = req.user;

    _models2.default.User.findById(user.id).then(function (myUser) {
        res.json({ notifications: myUser.notifications });
    }).catch(function (err) {
        res.status(500).json({
            message: err
        });
    });
};

userController.removeNotification = function (req, res) {
    var user = req.user;
    var id = req.body.id;

    _models2.default.User.findById(user.id).then(function (myUser) {
        myUser.notifications = myUser.notifications.filter(function (notif) {
            return notif.id != id;
        });
        var notificationsCopy = myUser.notifications;
        myUser.save();
        res.json({ sucсess: true, notifications: notificationsCopy });
    }).catch(function (err) {
        res.status(500).json({
            message: err
        });
    });
};

userController.getUser = function (req, res) {
    var user = req.user;

    _models2.default.User.findById(user.id).populate({
        path: '_groups',
        model: 'Group',
        populate: {
            path: '_tests',
            model: 'Stack'
        }
    }).then(function (user) {
        return res.json({ user: user });
    });
};

userController.learnWords = function (req, res) {
    var user = req.user;
    var amount = req.body.amount;

    _models2.default.User.findByIdAndUpdate(user.id, { $inc: { wordsLearnt: amount } }).then(function (success) {
        return res.json({ success: true });
    });
};

userController.recoverPassword = function (req, res) {
    var email = req.body.email;

    _models2.default.User.findOne({ email: email }).then(function (user) {
        if (!user) {
            return res.json({ success: false });
        }
        var token = _jsonwebtoken2.default.sign({
            id: user._id,
            email: email
        }, _secret2.default);
        var uri = encodeURI(token);
        user.recoverToken = token;
        user.save().then(function (res) {
            var transporter = _nodemailer2.default.createTransport({
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
            var HelperOptions = {
                from: '"EasyLexLab" <easylexlab@gmail.com>',
                // to: user.email,
                to: 'easylexlab@gmail.com',
                subject: 'Восстановление пароля',
                text: '\u0427\u0442\u043E\u0431\u044B \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C, \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435: easylexlab.ru/recover/' + token
            };
            transporter.sendMail(HelperOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    return res.json({ success: true });
                }
            });
        });
    });
};

userController.checkToken = function (req, res) {
    var token = req.body.token;
    _models2.default.User.findOne({ recoverToken: token }).then(function (user) {
        if (user) {
            user.recoverToken = '';
            user.save().then(function (rr) {
                return res.json({ success: true });
            });
        }
        return res.json({ success: false });
    });
};

exports.default = userController;
//# sourceMappingURL=userController.js.map