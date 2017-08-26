import mongoose from 'mongoose';
import moment from 'moment';
moment.locale('ru');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const notificationSchema = new Schema({
  type: { type: String, required: true },
  _author: { type: Schema.ObjectId, ref: 'User', required: true },
  pic: { type: String, default: null },
  text: { type: String, default: null },
  seen: { type: Boolean, default: false },
  createdAt: { type: String, default: moment().format('LL') }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
