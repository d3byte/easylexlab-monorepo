import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const stackSchema = new Schema({
  name: { type: String, required: true },
  tasks: {type: Array, required: true},
  test: { type: Array, required: true },
  timeToDo: { type: Number, default: 1 },
  _group: { type: Schema.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Stack = mongoose.model('Stack', stackSchema);

export default Stack;
