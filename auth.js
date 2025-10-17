const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Simple domain-based login (for demo). In production, do real password auth.
router.post('/login', async (req, res) => {
  const { name, email } = req.body;
  if (!email || !name) return res.status(400).json({ error: 'name and email required' });

  // allow only certain domains (example: any @iit*.ac.in), change as needed
  const allowed = /@(iit|iitkgp|iitk|iitb|iiti).*/i;
  if (!allowed.test(email)) return res.status(403).json({ error: 'unauthorized domain' });

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, avatar: `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(name)}` });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  res.json({ token, user });
});

module.exports = router;
