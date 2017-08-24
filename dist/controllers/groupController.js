'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _randomatic = require('randomatic');

var _randomatic2 = _interopRequireDefault(_randomatic);

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

var _secret = require('./../secret');

var _secret2 = _interopRequireDefault(_secret);

var _helperFunctions = require('./helperFunctions');

var _helperFunctions2 = _interopRequireDefault(_helperFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
                        newCode += (0, _randomatic2.default)('A0', 1);
                    }
                }
                var _group = new _models2.default.Group({
                    name: name,
                    code: newCode,
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
        msgText = _req$body4.msgText,
        author = _req$body4.author;


    var message = {
        author: author.name,
        pic: author.avaUrl,
        text: msgText
    };

    var notification = {
        type: 'newMsg',
        author: author.name,
        pic: author.avaUrl,
        text: fullName + ' \u043F\u0440\u0438\u0441\u043B\u0430\u043B(\u0430) \u0432\u0430\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435.',
        seen: false
    };

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        _models2.default.Group.findByIdAndUpdate(groupId, {
            $push: { messages: message }
        }).then(function (group) {
            console.log(group);
            _models2.default.User.update({ _groups: { $in: [groupId] } }, { $push: { notifications: notification } }).then(function (success) {
                console.log(success);
                res.json({ success: true });
            }).catch(function (error) {
                throw error;
            });
        }).catch(function (err) {
            throw err;
        });
    }
};

exports.default = groupController;
//# sourceMappingURL=groupController.js.map