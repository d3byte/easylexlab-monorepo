import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const stackSchema = new Schema({
  name: { type: String, required: true },
  _group: { type: Schema.ObjectId, ref: 'Group' },
  content: [{type: String, required: true }],
  language: { type: String, default: 'English' }
});

const Stack = mongoose.model('Stack', stackSchema);

export default Stack;

// Is it really needed?
