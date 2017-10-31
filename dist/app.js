'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _quickthumb = require('quickthumb');

var _quickthumb2 = _interopRequireDefault(_quickthumb);

var _secret = require('./secret');

var _secret2 = _interopRequireDefault(_secret);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost:27017/eng_proj', {
    useMongoClient: true
}, function () {
    console.log('Connected to mongodb');
});

var app = (0, _express2.default)();

// Public folder
var folder = __dirname + "/app/";

app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/signup', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/signup/student', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/signup/teacher', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/profile', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/profile/msg', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/group/:id', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/group/:id/newtask', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/settings', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/profile/newgroup', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/stats', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/login', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/forgotpassword', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/recover/:token', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/info/rules', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});
app.get('/task/:id', function (req, res) {
    res.sendFile(_path2.default.join(folder + "index.html"));
});

app.use(_quickthumb2.default.static(__dirname + '/'));
app.use('/', _express2.default.static(folder));
app.use('/signup', _express2.default.static(folder));
app.use('/signup/student', _express2.default.static(folder));
app.use('/signup/teacher', _express2.default.static(folder));
app.use('/profile', _express2.default.static(folder));
app.use('/group', _express2.default.static(folder));
app.use('/group/:id', _express2.default.static(folder));
app.use('/task', _express2.default.static(folder));
app.use('/task/:id', _express2.default.static(folder));
app.use('/recover', _express2.default.static(folder));
app.use('/recover/:token', _express2.default.static(folder));
app.use('/info', _express2.default.static(folder));
app.use('/info/rules', _express2.default.static(folder));

var whitelist = ['http://cf82612.tmweb.ru', 'http://easylexlab.ru'];
var corsOptions = {
    origin: function origin(_origin, callback) {
        if (whitelist.indexOf(_origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, _cors2.default)(corsOptions));
// app.use(cors(corsOptions));
app.use('/api', _routes2.default);
// app.use(expressJWT({ secret: secret }).unless({ path: ['api/login', '/'] }));

exports.default = app;
//# sourceMappingURL=app.js.map