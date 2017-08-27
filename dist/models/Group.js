'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment2.default.locale('ru');

var Schema = _mongoose2.default.Schema;


_mongoose2.default.Promise = global.Promise;

var groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: { type: String, required: true },
  grade: { type: Number, required: true },
  _teacher: { type: Schema.ObjectId, ref: 'User', required: true },
  _students: [{ type: Schema.ObjectId, ref: 'User' }],
  _tests: [{ type: Schema.ObjectId, ref: 'Stack' }],
  messages: { type: Array, default: null },
  createdAt: { type: String, default: (0, _moment2.default)().format('LL') },
  isDeleted: { type: Boolean, default: false }
});

var Group = _mongoose2.default.model('Group', groupSchema);

exports.default = Group;
//# sourceMappingURL=Group.js.map