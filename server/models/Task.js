import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const taskSchema = new Schema({
  name: { type: String, required: true },
  repeat: { type: Number, default: 1 },
  content: [{type: Object, required: true }]
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
