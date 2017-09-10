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

// app.get('/', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/profile', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/profile/msg', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/group/:id', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/group/:id/newtask', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/settings', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/profile/newgroup', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/stats', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/forgotpassword', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/recover/:token', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/eula', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
// app.get('/task/:id', (req, res) => {
//     res.sendFile(path.join(folder + "index.html"));
// });
//
// app.use(qt.static(__dirname + '/'));
// app.use('/', express.static(folder));
// app.use('/profile', express.static(folder));
// app.use('/group', express.static(folder));
// app.use('/group/:id', express.static(folder));
// app.use('/task', express.static(folder));
// app.use('/task/:id', express.static(folder));
// app.use('/recover', express.static(folder));
// app.use('/recover/:token', express.static(folder));

// Middleware
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use('/api', _routes2.default);
// app.use(expressJWT({ secret: secret }).unless({ path: ['api/login', '/'] }));

exports.default = app;
//# sourceMappingURL=app.js.map