import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  _group: { type: Schema.ObjectId, ref: 'Group' },
  content: [{type: String, required: true }]
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
