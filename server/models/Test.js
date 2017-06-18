import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const testSchema = new Schema({
  name: { type: String, required: true },
  tasks: [{ type: Schema.ObjectId, ref: 'Task', required: true }],
  content: [{ type: Object, required: true }],
  createdAt: { type: Date, default: Date.now },
  timeToDo: { type: Number, default: 1 }
});

const Test = mongoose.model('Test', testSchema);

export default Test;
