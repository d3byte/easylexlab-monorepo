import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  grade: { type: Number, required: true },
  _teacher: { type: Schema.ObjectId, ref: 'User', required: true },
  _students: [{ type: Schema.ObjectId, ref: 'User'}],
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
});

const Group = mongoose.model('Group', groupSchema);

export default Group;