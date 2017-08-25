import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const notificationSchema = new Schema({
  type: { type: String, required: true },
  _author: { type: Schema.ObjectId, ref: 'User', required: true },
  pic: { type: String, default: null },
  text: { type: String, default: null },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
