import mongoose from 'mongoose';
import moment from 'moment';
moment.locale('ru');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const stackSchema = new Schema({
  name: { type: String, required: true },
  tasks: {type: Array, required: true},
  timeToDo: { type: Number, default: 1 },
  _group: { type: Schema.ObjectId, ref:'Group', required: true },
  attempts: { type: Object, required: true },
  results: { type: Array, default: null },
  createdAt: { type: Date, default: moment().format('LL') }
});

const Stack = mongoose.model('Stack', stackSchema);

export default Stack;
