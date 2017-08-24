'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


_mongoose2.default.Promise = global.Promise;

var notificationSchema = new Schema({
  type: { type: String, required: true },
  _author: { type: Schema.ObjectId, ref: 'User', required: true },
  grade: { type: Number, required: true },
  text: { type: String, default: null },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

var Notification = _mongoose2.default.model('Notification', notificationSchema);

exports.default = Notification;
//# sourceMappingURL=Notification.js.map