import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: [5, 'Логин должен состоять хотя бы из 5 символов.']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Пароль должен состоять хотя бы из 8 символов.'],
    bcrypt: true
  },
  school: { type: String, default: null },
  _groups: [{ type: Schema.ObjectId, ref: 'Group' }],
  notifications: [{ type: Object, default: null }],
  permissions: { type: String, required: true },
  social: [{ type: Object, default: null }],
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
});


userSchema.plugin(require('mongoose-bcrypt'));

const User = mongoose.model('User', userSchema);

export default User;
