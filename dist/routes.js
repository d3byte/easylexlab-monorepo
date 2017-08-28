'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _secret = require('./secret');

var _secret2 = _interopRequireDefault(_secret);

var _basicController = require('./controllers/basicController');

var _basicController2 = _interopRequireDefault(_basicController);

var _userController = require('./controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _groupController = require('./controllers/groupController');

var _groupController2 = _interopRequireDefault(_groupController);

var _stackController = require('./controllers/stackController');

var _stackController2 = _interopRequireDefault(_stackController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Controller imports
var routes = (0, _express2.default)();

// Basic routes
routes.get('/', _basicController2.default.get);

// User routes
routes.post('/signup', _userController2.default.post);
routes.post('/login', _userController2.default.login);
routes.post('/groups', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.getGroups);
routes.post('/verifypassword', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.verifyPassword);
routes.post('/recover', _userController2.default.recoverPassword);
routes.post('/checktoken', _userController2.default.checkToken);
routes.patch('/newinfo', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.updateInfo);
routes.patch('/newpassword', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.changePassword);
routes.patch('/addgroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.addGroup);
routes.post('/user', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.getUser);
routes.patch('/words', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.learnWords);

// Group routes
routes.post('/regcode', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.regCode);
routes.post('/addgroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.post);
routes.delete('/deletegroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.delete);
routes.patch('/addstudent', _groupController2.default.addStudent);
routes.post('/getgroups', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.getGroups);
routes.post('/getgroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.getGroup);
routes.post('/addtest', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.addTest);

// Stack routes
routes.post('/newstack', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.post);
routes.post('/gettests', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.getTests);
routes.post('/gettest', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.getTest);
routes.patch('/addresult', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.addResult);
routes.patch('/updateresult', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.updateResult);

// Notification and message routes
routes.post('/newmsg', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.newMsg);
routes.post('/getnotifs', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.getNotifications);
routes.post('/removenotif', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.removeNotification);

exports.default = routes;
//# sourceMappingURL=routes.js.map