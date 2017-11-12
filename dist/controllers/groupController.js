'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _randomatic = require('randomatic');

var _randomatic2 = _interopRequireDefault(_randomatic);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

var _secret = require('./../secret');

var _secret2 = _interopRequireDefault(_secret);

var _helperFunctions = require('./helperFunctions');

var _helperFunctions2 = _interopRequireDefault(_helperFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment2.default.locale('ru');

var groupController = {};

// New group
groupController.post = function (req, res) {
    var _req$body = req.body,
        name = _req$body.name,
        grade = _req$body.grade;


    var user = req.user;

    if (user.permissions == "admin" || user.permissions == "teacher") {
        var code = (0, _randomatic2.default)('A0', 5);
        _models2.default.Group.findOne({ code: code }, function (err, group) {
            if (err) throw err;
            if (group) {
                var index = _helperFunctions2.default.randomInteger(1, 5);
                var newCode = '';
                for (var i = 0; i < code.length; i++) {
                    if (i != index) {
                        newCode += code[i];
                    } else {
                        newCode += (0, _randomatic2.default)('a0', 1);
                    }
                }
                var _group = new _models2.default.Group({
                    name: name,
                    code: newCode.toLowerCase(),
                    grade: grade,
                    _teacher: user.id
                });
                _group.save().then(function (newGroup) {
                    return res.status(200).json({
                        success: true,
                        data: newGroup
                    });
                }).catch(function (err) {
                    return res.status(500).json({
                        message: err
                    });
                });
            } else {
                var _group2 = new _models2.default.Group({
                    name: name,
                    code: code,
                    grade: grade,
                    _teacher: user.id
                });

                _group2.save().then(function (newGroup) {
                    return res.status(200).json({
                        success: true,
                        data: newGroup
                    });
                }).catch(function (err) {
                    return res.status(500).json({
                        message: err
                    });
                });
            }
        });
    } else {
        return res.status(501).json({
            message: 'Access denied'
        });
    }
};

// Remove group
groupController.delete = function (req, res) {
    var groupId = req.body.groupId;
    var user = req.user;

    if (user.permissions == "admin" || user.permissions == "teacher") {
        _models2.default.Group.findByIdAndRemove(groupId).then(function () {
            return res.status(200).json({
                success: true
            });
        }).catch(function (err) {
            return res.status(500).json({
                message: err
            });
        });
    } else {
        return res.status(501).json({
            message: 'Access denied'
        });
    }
};

// Add student
groupController.addStudent = function (req, res) {
    var _req$body2 = req.body,
        groupCode = _req$body2.groupCode,
        studentId = _req$body2.studentId;


    _models2.default.Group.findOneAndUpdate({ code: groupCode }, { $push: { '_students': studentId } }).then(function (existingGroup) {
        return res.status(200).json({
            success: true
        });
    }).catch(function (err) {
        return res.status(500).json({
            message: err
        });
    });
};

// Get groups of teacher
groupController.getGroups = function (req, res) {
    var userId = req.user.id;

    _models2.default.Group.find({ _teacher: userId }).populate({
        path: '_teacher',
        select: 'name username createdAt _id',
        match: { 'isDeleted': false }
    }).populate({
        path: '_tests',
        select: 'name tasks timeToDo _group attempts results'
    }).populate({
        path: '_students',
        select: 'name username',
        match: { 'isDeleted': false }
    }).then(function (groups) {
        return res.status(200).json({
            success: true,
            data: groups
        });
    }).catch(function (err) {
        res.status(500).json({
            message: err
        });
    });
};

// Watch one exact group
groupController.getGroup = function (req, res) {
    var groupId = req.body.groupId;
    _models2.default.Group.findById(groupId).populate({
        path: '_students',
        select: '',
        match: { 'isDeleted': false }
    }).populate({
        path: '_tests',
        select: 'name tasks timeToDo _group attempts results'
    }).then(function (group) {
        return res.status(200).json({
            success: true,
            group: group
        });
    }).catch(function (err) {
        res.status(500).json({
            message: err
        });
    });
};

// Stick test to group
groupController.addTest = function (req, res) {
    var _req$body3 = req.body,
        groupId = _req$body3.groupId,
        stackId = _req$body3.stackId;


    var user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.Stack.findById(stackId).then(function (stack) {
            _models2.default.Group.findById(groupId).then(function (group) {
                group._tests.push(stack._id);
                group.save().then(function (suc) {
                    res.status(200).json({ success: true });
                }).catch(function (error) {
                    throw error;
                });
            }).catch(function (err) {
                throw err;
            });
        }).catch(function (err) {
            throw err;
        });
    } else res.status(501).json({ 'error': 'No permissions for this action' });
};

// Registration link
groupController.regCode = function (req, res) {
    var groupId = req.body.groupId;
    var user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.Group.findById(groupId).then(function (group) {
            return res.json({
                success: true,
                groupCode: group.code
            });
        });
    }
};

groupController.newMsg = function (req, res) {
    var user = req.user;
    var _req$body4 = req.body,
        groupId = _req$body4.groupId,
        msgText = _req$body4.msgText;


    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.User.findById(user.id).then(function (userAccount) {
            var message = {
                authorId: userAccount._id,
                id: (0, _randomatic2.default)('*', 15),
                author: userAccount.firstName + " " + userAccount.lastName,
                pic: userAccount.picUrl,
                text: msgText,
                date: (0, _moment2.default)().format('LL')
            };

            var notification = {
                type: 'newMsg',
                authorId: userAccount._id,
                author: userAccount.firstName + " " + userAccount.lastName,
                pic: userAccount.picUrl,
                text: userAccount.firstName + " " + userAccount.lastName + ' \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435.',
                seen: false,
                date: (0, _moment2.default)().format('LL'),
                id: (0, _randomatic2.default)('0A', 10)
            };

            _models2.default.Group.findByIdAndUpdate(groupId, {
                $push: { messages: message }
            }).then(function (group) {
                _models2.default.User.update({ _groups: { $in: [groupId] } }, { $push: { notifications: notification } }, {
                    multi: true
                }).then(function (success) {
                    res.json({ success: true, message: message });
                }).catch(function (error) {
                    throw error;
                });
            }).catch(function (err) {
                throw err;
            });
        }).catch(function (err) {
            throw err;
        });
    }
};

groupController.changeName = function (req, res) {
    var _req$body5 = req.body,
        groupId = _req$body5.groupId,
        name = _req$body5.name;

    var user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.Group.findByIdAndUpdate(groupId, { $set: { name: name } }).then(function (success) {
            return res.json({ success: true });
        });
    }
};

groupController.deleteMsg = function (req, res) {
    var _req$body6 = req.body,
        groupId = _req$body6.groupId,
        msgId = _req$body6.msgId;

    var user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.Group.findById(groupId).then(function (group) {
            group.messages = group.messages.filter(function (item) {
                return item.id != msgId;
            });
            group.save().then(function (s) {
                return res.json({ success: true });
            });
        });
    }
};

groupController.deleteGroup = function (req, res) {
    var groupId = req.body.groupId;
    var user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.Group.findByIdAndRemove(groupId).then(function (success) {
            _models2.default.User.update({ _groups: { $in: [groupId] } }, { $pull: { _groups: groupId } }, {
                multi: true
            }).then(function (success) {
                return res.json({ success: true });
            });
        });
    }
};

groupController.removeStudent = function (req, res) {
    var _req$body7 = req.body,
        groupId = _req$body7.groupId,
        userId = _req$body7.userId;

    var user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.Group.findByIdAndUpdate(groupId, {
            $pull: { '_students': userId }
        }).then(function (success) {
            _models2.default.User.findByIdAndUpdate(userId, { $pull: { '_groups': groupId } }).then(function (r) {
                res.json({ success: true });
            });
        });
    }
};

exports.default = groupController;
//# sourceMappingURL=groupController.js.map