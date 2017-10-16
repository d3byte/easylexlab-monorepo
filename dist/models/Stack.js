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

var stackSchema = new Schema({
  name: { type: String, required: true },
  tasks: { type: Array, required: true },
  timeToDo: { type: Number, default: 1 },
  _group: { type: Schema.ObjectId, ref: 'Group', required: true },
  attempts: { type: Object, required: true },
  results: { type: Array, default: null },
  createdAt: { type: String, default: (0, _moment2.default)().format('LL') },
  deadline: { type: String, required: true }
});

var Stack = _mongoose2.default.model('Stack', stackSchema);

exports.default = Stack;
//# sourceMappingURL=Stack.js.map