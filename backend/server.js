require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Temple Management Backend API running!' });
});

// DB Connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Placeholder for routes
app.use('/api/devotees', require('./routes/devotees'));
app.use('/api/sevas', require('./routes/sevas'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));

// 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

