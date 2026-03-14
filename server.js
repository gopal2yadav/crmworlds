require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Email Schema & Model
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

const Email = mongoose.model('Email', emailSchema);

// POST - Subscribe
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.json({ message: 'Thank you for subscribing to CRMworlds!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This email is already subscribed!' });
    }
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// GET - View all emails (admin protected)
app.get('/emails', async (req, res) => {
  const { adminKey } = req.query;
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  const emails = await Email.find().sort({ subscribedAt: -1 });
  res.json(emails);
});

app.listen(PORT, () => {
  console.log('CRMworlds server running at http://localhost:' + PORT);
});
