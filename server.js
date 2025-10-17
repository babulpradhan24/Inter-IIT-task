require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const commentsRoutes = require('./routes/comments');

app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interiit_comments')
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch(err => console.error(err));
