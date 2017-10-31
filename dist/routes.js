'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

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
var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, Date.now() + _path2.default.extname(file.originalname));
    }
});

var upload = (0, _multer2.default)({ storage: storage });

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
routes.post('/feedback', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.sendFeedback);
routes.patch('/newinfo', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.updateInfo);
routes.post('/upload-image', upload.single('image'), function (req, res) {
    if (req.file.filename) {
        _models2.default.User.findById(req.body.userName).then(function (user) {
            var filePath = 'uploads/' + user.picUrl;
            _fs2.default.exists(filePath, function (exists) {
                if (exists) {
                    _fs2.default.unlink(filePath, function (err) {
                        if (err) {
                            console.log("failed to delete local image: " + err);
                            return;
                        }
                        user.picUrl = req.file.filename;
                        user.save().then(function () {
                            return res.json({
                                success: true
                            });
                        });
                    });
                } else {
                    user.picUrl = req.file.filename;
                    user.save().then(function () {
                        return res.json({
                            success: true
                        });
                    });
                }
            });
        }).catch(function (err) {
            return res.status(500).json({
                message: err
            });
        });
    }
});
routes.patch('/newpassword', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.changePassword);
routes.patch('/addgroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.addGroup);
routes.post('/user', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.getUser);
routes.patch('/words', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.learnWords);
routes.post('/leavegroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.leaveGroup);
routes.post('/getavatar', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.getAvatar);

// Group routes
routes.post('/regcode', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.regCode);
routes.post('/addgroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.post);
routes.delete('/deletegroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.delete);
routes.patch('/addstudent', _groupController2.default.addStudent);
routes.post('/getgroups', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.getGroups);
routes.post('/getgroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.getGroup);
routes.post('/addtest', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.addTest);
routes.patch('/changename', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.changeName);
routes.post('/deletemsg', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.deleteMsg);
routes.post('/deletegroup', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.deleteGroup);
routes.post('/removestudent', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.removeStudent);

// Stack routes
routes.post('/newstack', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.post);
routes.post('/gettests', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.getTests);
routes.post('/gettest', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.getTest);
routes.patch('/addresult', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.addResult);
routes.patch('/updateresult', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.updateResult);
routes.post('/removetask', (0, _expressJwt2.default)({ secret: _secret2.default }), _stackController2.default.removeStack);

// Notification and message routes
routes.post('/newmsg', (0, _expressJwt2.default)({ secret: _secret2.default }), _groupController2.default.newMsg);
routes.post('/getnotifs', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.getNotifications);
routes.post('/removenotif', (0, _expressJwt2.default)({ secret: _secret2.default }), _userController2.default.removeNotification);

exports.default = routes;
//# sourceMappingURL=routes.js.map