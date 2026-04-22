const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// GET all alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(20);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create alert
router.post('/', async (req, res) => {
  const alert = new Alert(req.body);
  try {
    const newAlert = await alert.save();
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update status
router.put('/:id/status', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(alert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE dismiss
router.delete('/:id', async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

