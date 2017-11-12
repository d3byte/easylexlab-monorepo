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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

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
                                if (newUser.permissions == 'student') {
                                    var HelperOptions = {
                                        from: '"EasyLexLab" <easylexlab@gmail.com>',
                                        to: newUser.email,
                                        // to: 'easylexlab@gmail.com',
                                        subject: 'Регистрация на EasyLexLab',
                                        text: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, ' + newUser.firstName + ' ' + newUser.lastName + '!\n\n' + 'Благодарим вас за то, что вы стали пользователем EasyLexLab!\n\n' + ('\u041B\u043E\u0433\u0438\u043D: ' + newUser.username + '\n') + ('\u041F\u0430\u0440\u043E\u043B\u044C: ' + password + '\n\n') + 'EasyLexLab – это образовательная платформа для изучения иностранных слов, предназначенная для учителей и учеников, изучающих языки.\n\n' + 'EasyLexLab может Вам помочь:\n\n' + '– Эффективно усваивать слова, необходимые для использования на уроках.\n' + '– Выполнять домашнее задание в любом месте в любое время, используя смартфон, компьютер или планшет.\n' + '– В игровой форме запоминать слова, что превращает рутинную работу в интересное и полезное занятие.\n' + '– Ежедневно наблюдать прогресс и становиться всё ближе к цели – "свободно общаться на иностранном языке\n\n' + 'Удачного вам обучения!\n\n' + 'С уважением,\n' + 'Команда EasyLexLab'
                                    };
                                    transporter.sendMail(HelperOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            return res.json({ success: true });
                                        }
                                    });
                                } else if (newUser.permissions == 'teacher') {
                                    var _HelperOptions = {
                                        from: '"EasyLexLab" <easylexlab@gmail.com>',
                                        to: newUser.email,
                                        // to: 'easylexlab@gmail.com',
                                        subject: 'Регистрация на EasyLexLab',
                                        text: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, ' + newUser.firstName + ' ' + newUser.lastName + '!\n\n' + 'Благодарим вас за то, что вы стали пользователем EasyLexLab!\n\n' + ('\u041B\u043E\u0433\u0438\u043D: ' + newUser.username + '\n') + ('\u041F\u0430\u0440\u043E\u043B\u044C: ' + password + '\n\n') + 'EasyLexLab – это образовательная платформа для изучения иностранных слов, предназначенная для учителей и учеников, изучающих языки.\n\n' + 'EasyLexLab может Вам помочь:\n\n' + '- Использовать компьютерные технологии не выходя за рамки образовательной программы и ФГОС.\n' + '- Проводить уроки более эффективно, так как процесс изучения и усвоения новых слов вынесен за рамки урока (дети делают все самостоятельно, дома).\n' + '- Более гибко подходить к процессу изучения иностранного языка, учитывая уровень и потребность каждой группы.\n' + '- Контролировать изучение слов, помогая ученикам быстрее достигать успехов в изучении языков.\n\n' + 'С нами эффективно учить и легко учиться!\n\n' + 'С уважением,\n' + 'Команда EasyLexLab'
                                    };
                                    transporter.sendMail(_HelperOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            return res.json({ success: true });
                                        }
                                    });
                                }
                                return res.status(200).json({
                                    success: true,
                                    userId: newUser._id
                                });
                            }).catch(function (err) {
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
                            if (newUser.permissions == 'student') {
                                var HelperOptions = {
                                    from: '"EasyLexLab" <easylexlab@gmail.com>',
                                    to: newUser.email,
                                    // to: 'easylexlab@gmail.com',
                                    subject: 'Регистрация на EasyLexLab',
                                    text: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, ' + newUser.firstName + ' ' + newUser.lastName + '!\n\n' + 'Благодарим вас за то, что вы стали пользователем EasyLexLab!\n\n' + ('\u041B\u043E\u0433\u0438\u043D: ' + newUser.username + '\n') + ('\u041F\u0430\u0440\u043E\u043B\u044C: ' + password + '\n\n') + 'EasyLexLab – это образовательная платформа для изучения иностранных слов, предназначенная для учителей и учеников, изучающих языки.\n\n' + 'EasyLexLab может Вам помочь:\n\n' + '– Эффективно усваивать слова, необходимые для использования на уроках.\n' + '– Выполнять домашнее задание в любом месте в любое время, используя смартфон, компьютер или планшет.\n' + '– В игровой форме запоминать слова, что превращает рутинную работу в интересное и полезное занятие.\n' + '– Ежедневно наблюдать прогресс и становиться всё ближе к цели – "свободно общаться на иностранном языке\n\n' + 'Удачного вам обучения!\n\n' + 'С уважением,\n' + 'Команда EasyLexLab'
                                };
                                transporter.sendMail(HelperOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        return res.json({ success: true });
                                    }
                                });
                            } else if (newUser.permissions == 'teacher') {
                                var _HelperOptions2 = {
                                    from: '"EasyLexLab" <easylexlab@gmail.com>',
                                    to: newUser.email,
                                    // to: 'easylexlab@gmail.com',
                                    subject: 'Регистрация на EasyLexLab',
                                    text: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, ' + newUser.firstName + ' ' + newUser.lastName + '!\n\n' + 'Благодарим вас за то, что вы стали пользователем EasyLexLab!\n\n' + ('\u041B\u043E\u0433\u0438\u043D: ' + newUser.username + '\n') + ('\u041F\u0430\u0440\u043E\u043B\u044C: ' + password + '\n\n') + 'EasyLexLab – это образовательная платформа для изучения иностранных слов, предназначенная для учителей и учеников, изучающих языки.\n\n' + 'EasyLexLab может Вам помочь:\n\n' + '- Использовать компьютерные технологии не выходя за рамки образовательной программы и ФГОС.\n' + '- Проводить уроки более эффективно, так как процесс изучения и усвоения новых слов вынесен за рамки урока (дети делают все самостоятельно, дома).\n' + '- Более гибко подходить к процессу изучения иностранного языка, учитывая уровень и потребность каждой группы.\n' + '- Контролировать изучение слов, помогая ученикам быстрее достигать успехов в изучении языков.\n\n' + 'С нами эффективно учить и легко учиться!\n\n' + 'С уважением,\n' + 'Команда EasyLexLab'
                                };
                                transporter.sendMail(_HelperOptions2, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        return res.json({ success: true });
                                    }
                                });
                            }
                            return res.status(200).json({
                                success: true,
                                userId: newUser._id
                            });
                        }).catch(function (err) {
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
                    id: user._id,
                    permissions: user.permissions
                }, _secret2.default);
                res.status(200).json({
                    success: valid,
                    token: token
                });
            } else {
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

    _models2.default.User.findByIdAndUpdate(user.id, { $set: { password: newPassword, recoverToken: '' } }).then(function (myUser) {
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

    _models2.default.Group.findOne({ code: groupCode }).then(function (group) {
        var includes = false;
        group._students.map(function (student) {
            if (student == user.id) {
                includes = true;
            }
        });
        if (!includes) {
            group._students.push(user.id);
            group.save().then(function (r) {
                _models2.default.User.findByIdAndUpdate(user.id, { $push: { '_groups': group._id } }).then(function (myUser) {
                    res.json({ success: true });
                }).catch(function (err) {
                    res.status(500).json({
                        body: err
                    });
                });
            });
        } else {
            return res.json({ success: false });
        }
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
    var _req$body4 = req.body,
        amount = _req$body4.amount,
        stackId = _req$body4.stackId,
        userResult = _req$body4.userResult,
        pairsLength = _req$body4.pairsLength;


    _models2.default.Stack.findById(stackId).then(function (stack) {
        var result = stack.results.filter(function (result) {
            return result.userId == user.id;
        });
        if (result[0]) {
            var difference = Math.abs(result[0].result - userResult);
            var newAmount = Math.round(pairsLength * (difference / 100));
            _models2.default.User.findByIdAndUpdate(user.id, { $inc: { wordsLearnt: newAmount } }).then(function (success) {
                return res.json({ wordsLearnt: newAmount });
            });
        } else {
            _models2.default.User.findByIdAndUpdate(user.id, { $inc: { wordsLearnt: amount } }).then(function (success) {
                return res.json({ wordsLearnt: amount, firstTime: true });
            });
        }
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
                to: user.email,
                // to: 'easylexlab@gmail.com',
                subject: 'Восстановление пароля',
                text: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, ' + (user.firstName + ' ' + user.lastName) + '!\n        \n        \u0427\u0442\u043E\u0431\u044B \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C, \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435:\n        easylexlab.ru/recover/' + token + '\n        \n        \u0415\u0441\u043B\u0438 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430, \u0441\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 URL-\u0430\u0434\u0440\u0435\u0441 \u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440.\n\n        \u0415\u0441\u043B\u0438 \u0432\u044B \u043D\u0435 \u0437\u0430\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u043B\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F, \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435.\n\n        \u0421 \u0443\u0432\u0430\u0436\u0435\u043D\u0438\u0435\u043C, \n        \u041A\u043E\u043C\u0430\u043D\u0434\u0430 EasyLexLab'
            };
            transporter.sendMail(HelperOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
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
            return res.json({ success: true });
        }
        return res.json({ success: false });
    });
};

userController.sendFeedback = function (req, res) {
    var user = req.user;
    var _req$body5 = req.body,
        name = _req$body5.name,
        text = _req$body5.text,
        email = _req$body5.email;


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
        from: name + ' <' + email + '>',
        to: 'easylexlab@gmail.com',
        subject: 'Отзыв',
        text: name + ': ' + text + '\n' + email
    };
    transporter.sendMail(HelperOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            return res.json({ success: true });
        }
    });
};

userController.leaveGroup = function (req, res) {
    var user = req.user;
    var groupId = req.body.groupId;
    _models2.default.User.findById(user.id).then(function (myUser) {
        myUser._groups = myUser._groups.filter(function (group) {
            return group != groupId;
        });
        myUser.save().then(function (success) {
            res.json({
                success: true
            });
        });
    });
};

userController.getAvatar = function (req, res) {
    var user = req.user;
    var picName = req.body.picName;
    var filePath = 'uploads/' + picName;
    if (user && picName) {
        _fs2.default.exists(filePath, function (exists) {
            if (exists) {
                _fs2.default.readFile(filePath, { encoding: "base64" }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    var ext = _path2.default.extname(filePath);
                    // res.writeHead(200, { 'Content-Type': `image/${ext}` })
                    // res.end(data, 'binary');
                    return res.json({
                        img: data,
                        ext: ext
                    });
                });
            }
        });
    }
};

exports.default = userController;
//# sourceMappingURL=userController.js.map