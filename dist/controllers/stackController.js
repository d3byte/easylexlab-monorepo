'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _randomatic = require('randomatic');

var _randomatic2 = _interopRequireDefault(_randomatic);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _secret = require('./../secret');

var _secret2 = _interopRequireDefault(_secret);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

var _helperFunctions = require('./helperFunctions');

var _helperFunctions2 = _interopRequireDefault(_helperFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stackController = {};

_moment2.default.locale('ru');

// New stack
stackController.post = function (req, res) {
    var _req$body = req.body,
        name = _req$body.name,
        tasks = _req$body.tasks,
        timeToDo = _req$body.timeToDo,
        groupId = _req$body.groupId,
        attempts = _req$body.attempts;


    var user = req.user;

    if (user.permissions == "teacher" || user.permissions == "admin") {
        var stack = new _models2.default.Stack({
            name: name,
            tasks: tasks,
            timeToDo: timeToDo,
            _group: groupId,
            attempts: attempts,
            deadline: (0, _moment2.default)().add(timeToDo, 'days').format('LL')
        });
        stack.save().then(function (stack) {
            _models2.default.User.findById(user.id).then(function (userAccount) {
                console.log(userAccount);
                console.log(user.id);
                var notification = {
                    type: 'newTask',
                    authorId: userAccount._id,
                    author: userAccount.firstName + " " + userAccount.lastName,
                    pic: userAccount.picUrl,
                    text: userAccount.firstName + " " + userAccount.lastName + ' \u0441\u043E\u0437\u0434\u0430\u043B \u043D\u043E\u0432\u043E\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u0435.',
                    seen: false,
                    date: (0, _moment2.default)().subtract(timeToDo, 'days').format('LL'),
                    id: (0, _randomatic2.default)('0A', 10)
                };
                _models2.default.User.update({ _groups: { $in: [groupId] } }, { $push: { notifications: notification } }, {
                    multi: true
                }).then(function (success) {
                    _models2.default.Group.findById(stack._group).populate({
                        path: '_students',
                        model: 'User',
                        select: 'email'
                    }).then(function (group) {
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
                        var maillist = group._students.map(function (student) {
                            return student.email;
                        });
                        maillist = maillist.join(', ');
                        console.log(maillist);
                        var HelperOptions = {
                            from: userAccount.firstName + userAccount.lastName + ' <' + userAccount.email + '>',
                            to: maillist,
                            subject: 'Новое задание',
                            text: userAccount.firstName + userAccount.lastName + ' \u0441\u043E\u0437\u0434\u0430\u043B(\u0430) \u043D\u043E\u0432\u043E\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u0435. \u0421\u0440\u043E\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F: ' + stack.timeToDo + ' \u0434\u043D\u0435\u0439.'
                        };
                        transporter.sendMail(HelperOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                        });
                    });
                    return res.json({ success: true, stack: stack });
                }).catch(function (error) {
                    throw error;
                });
            });
        }).catch(function (err) {
            throw err;
        });
    }
};

// Get stacks of one exact group
stackController.getTests = function (req, res) {
    var groupId = req.body.groupId;
    var user = req.user;
    if (user.permissions == 'teacher' || user.permissions == 'admin' || user.permissions == 'student') {
        _models2.default.Stack.find({ _group: groupId }).populate({
            path: '',
            select: 'name _group tasks results timeToDo'
        }).then(function (stacks) {
            res.status(200).json({ stacks: stacks });
        }).catch(function (err) {
            res.status(500).json({ err: err });
        });
    } else res.status(501).json({ 'error': 'No permissions for this action' });
};

// Get one exact stack
stackController.getTest = function (req, res) {
    var testId = req.body.testId;
    var user = req.user;
    if (user.permissions == 'teacher' || user.permissions == 'admin' || user.permissions == 'student') {
        _models2.default.Stack.findById(testId).populate({ path: '', select: 'name tasks results test timeToDo' }).then(function (stack) {
            res.status(200).json({ stack: stack });
        }).catch(function (err) {
            res.status(500).json({ err: err });
        });
    } else res.status(501).json({ 'error': 'No permissions for this action' });
};

// Add result to the stack
stackController.addResult = function (req, res) {
    var _req$body2 = req.body,
        result = _req$body2.result,
        stackId = _req$body2.stackId,
        name = _req$body2.name,
        username = _req$body2.username,
        userId = _req$body2.userId;


    var user = req.user;

    _models2.default.Stack.findById(stackId).populate({
        path: '_group',
        model: 'Group'
    }).then(function (stack) {
        var results = {
            userId: user.id,
            username: username,
            name: name,
            stack: {
                name: stack.name,
                id: stack._id
            },
            groupName: stack._group.name,
            result: result
        };
        stack.results.push(results);
        stack.save();
        res.json({
            success: true
        });
    }).catch(function (err) {
        throw err;
    });
};

stackController.updateResult = function (req, res) {
    var _req$body3 = req.body,
        result = _req$body3.result,
        stackId = _req$body3.stackId;


    var user = req.user;

    _models2.default.Stack.update({
        _id: stackId,
        results: { $elemMatch: { userId: user.id } }
    }, {
        $set: {
            'results.$.result': result
        }
    }).then(function (success) {
        return res.json({ success: true });
    });
};

exports.default = stackController;
//# sourceMappingURL=stackController.js.map