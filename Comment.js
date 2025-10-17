const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }
});

module.exports = mongoose.model('Comment', commentSchema);
