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

// Middleware
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
app.use(_bodyParser2.default.json());
app.use('/api', _routes2.default);

exports.default = app;
//# sourceMappingURL=app.js.map
