import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, 'Логин должен состоять хотя бы из 5 символов.']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Пароль должен состоять хотя бы из 8 символов.'],
    bcrypt: true
  },
  _group: { type: Schema.ObjectId, ref: 'Group' },
  permissions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
});


userSchema.plugin(require('mongoose-bcrypt'));

const User = mongoose.model('User', userSchema);

export default User;
