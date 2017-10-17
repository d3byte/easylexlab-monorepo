import mongoose from 'mongoose';
import moment from 'moment';
moment.locale('ru');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
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
  recoverToken: { type: String, default: null },
  createdAt: { type: String, default: moment().format('LL') },
  isDeleted: { type: Boolean, default: false }
});


userSchema.plugin(require('mongoose-bcrypt'));

const User = mongoose.model('User', userSchema);

export default User;
