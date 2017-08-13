'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _secret = require('./../secret');

var _secret2 = _interopRequireDefault(_secret);

var _helperFunctions = require('./helperFunctions');

var _helperFunctions2 = _interopRequireDefault(_helperFunctions);

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = {};

userController.post = function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      username = _req$body.username,
      email = _req$body.email,
      password = _req$body.password,
      permissions = _req$body.permissions,
      groupCode = _req$body.groupCode,
      school = _req$body.school;


  _models2.default.User.findOne({ username: username }, function (err, user) {
    if (err) throw err;else if (user) res.json({ error: 'Даный логин уже занят' });else {
      _models2.default.User.findOne({ email: email }, function (err, user) {
        if (err) throw err;else if (user) res.json({ error: 'Данная электронная почта уже занята' });else {
          if (!!groupCode.length) {
            _models2.default.Group.findOne({ code: groupCode }).then(function (group) {
              var user = new _models2.default.User({
                name: name,
                username: username,
                email: email,
                password: password,
                permissions: permissions,
                _groups: [group._id],
                school: school
              });
              user.save().then(function (newUser) {
                console.log('Success:\n', newUser);
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
              name: name,
              username: username,
              email: email,
              password: password,
              permissions: permissions,
              _groups: [],
              school: school
            });
            _user.save().then(function (newUser) {
              console.log('Success:\n', newUser);
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
      console.log('Error');
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
    });
  }
};

userController.updateInfo = function (req, res) {
  var myUser = req.user;
  var _req$body3 = req.body,
      name = _req$body3.name,
      username = _req$body3.username;


  var query = {};

  if (name) query.name = name;
  if (username) query.username = username;else if (!name && !username) {
    return res.json({
      changed: false
    });
  }

  _models2.default.User.findByIdAndUpdate(myUser.id, {
    $set: query
  }).then(function (user) {
    return res.json({
      success: true,
      user: user
    });
  });
};

userController.verifyPassword = function (req, res) {
  var user = req.user;
  var password = req.body.password;
  _models2.default.User.findById(user.id).then(function (myUser) {
    myUser.verifyPassword(password).then(function (valid) {
      return res.json({ success: valid });
    });
  });
};

userController.changePassword = function (req, res) {
  var user = req.user;
  var newPassword = req.body.newPassword;

  _models2.default.User.findByIdAndUpdate(user.id, { $set: { password: newPassword } }).then(function (myUser) {
    return res.json({ success: true });
  });
};

userController.addGroup = function (req, res) {
  var groupCode = req.body.groupCode;
  var user = req.user;

  console.log(groupCode);

  _models2.default.Group.findOne({ code: groupCode }).then(function (group) {
    group._students.push(user.id);
    group.save();
    _models2.default.User.findByIdAndUpdate(user.id, { $push: { '_groups': group._id } }).then(function (myUser) {
      res.json({ success: true });
    });
  });
};

userController.addResult = function (req, res) {
  var _req$body4 = req.body,
      result = _req$body4.result,
      stackName = _req$body4.stackName;


  var user = req.user;

  var results = {
    stackName: stackName,
    result: result
  };

  _models2.default.User.findById(user.id).then(function (user) {
    user._results.push(results);
    user.save();
    res.json({
      success: true
    });
  }).catch(function (err) {
    throw err;
  });
};

userController.getNotifications = function (req, res) {
  var user = req.user;

  _models2.default.User.findById(user.id).then(function (user) {
    var notifsToSend = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = user.notifications[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var notification = _step.value;

        if (!notification.seen) notifsToSend.push(notification);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    res.json({ notifications: notifsToSend });
  });
};

userController.readNotifs = function (req, res) {
  var user = req.user;

  _models2.default.User.findById(user.id).then(function (user) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = user.notifications[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var notification = _step2.value;

        notification.seen = true;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    user.save();
    res.json({ success: true });
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

exports.default = userController;
//# sourceMappingURL=userController.js.map