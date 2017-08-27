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

var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String, required: true,
    minlength: [5, 'Логин должен состоять хотя бы из 5 символов.']
  },
  email: { type: String, required: true },
  password: {
    type: String, required: true,
    minlength: [6, 'Пароль должен состоять хотя бы из 6 символов.'],
    bcrypt: true
  },
  wordsLearnt: { type: Number, default: 0 },
  school: { type: String, default: null },
  _groups: [{ type: Schema.ObjectId, ref: 'Group', default: null }],
  _results: { type: Array, default: null },
  notifications: { type: Array, default: null },
  permissions: { type: String, required: true },
  picUrl: { type: String, default: null },
  city: { type: String, required: true },
  backgroundUrl: { type: String, default: null },
  createdAt: { type: String, default: (0, _moment2.default)().format('LL') },
  isDeleted: { type: Boolean, default: false }
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;
//# sourceMappingURL=User.js.map