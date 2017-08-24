'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _secret = require('./../secret');

var _secret2 = _interopRequireDefault(_secret);

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

var _helperFunctions = require('./helperFunctions');

var _helperFunctions2 = _interopRequireDefault(_helperFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stackController = {};

// New stack
stackController.post = function (req, res) {
    var _req$body = req.body,
        name = _req$body.name,
        tasks = _req$body.tasks,
        timeToDo = _req$body.timeToDo,
        groupId = _req$body.groupId,
        attempts = _req$body.attempts;

    // TODO: use lodash to refactor the code

    var user = req.user;

    if (user.permissions == "teacher" || user.permissions == "admin") {
        var stack = new _models2.default.Stack({
            name: name,
            tasks: tasks,
            timeToDo: timeToDo,
            _group: groupId,
            attempts: attempts
        });
        stack.save().then(function (stack) {
            res.status(200).json({
                success: true,
                stack: stack
            });
        }).catch(function (err) {
            res.status(500).json({ err: 'error' });
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

    var results = {
        userId: user.id,
        username: username,
        name: name,
        result: result
    };

    _models2.default.Stack.findById(stackId).then(function (stack) {
        stack.results.push(results);
        stack.save();
        res.json({
            success: true
        });
    }).catch(function (err) {
        throw err;
    });
};

exports.default = stackController;
//# sourceMappingURL=stackController.js.map