const express = require('express');
const Comment = require('../models/Comment');
const User = require('../models/User');
const router = express.Router();

// get all comments for a post (flat list) - frontend will build tree
router.get('/', async (req, res) => {
  const comments = await Comment.find().populate('user').sort({ created_at: 1 }).lean();
  res.json(comments);
});

router.post('/', async (req, res) => {
  const { text, parent, userId } = req.body;
  if (!text || !userId) return res.status(400).json({ error: 'text and userId required' });
  const comment = await Comment.create({ text, parent: parent || null, user: userId });
  const populated = await Comment.findById(comment._id).populate('user');
  res.status(201).json(populated);
});

router.post('/:id/upvote', async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true }).populate('user');
  res.json(comment);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // simple delete - in production, check permissions and cascade
  await Comment.findByIdAndDelete(id);
  res.json({ ok: true });
});

module.exports = router;
