const express = require('express');
const router = express.Router();
const Seva = require('../models/Seva');

// GET all sevas
router.get('/', async (req, res) => {
  try {
    const sevas = await Seva.find();
    res.json(sevas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new seva
router.post('/', async (req, res) => {
  const seva = new Seva(req.body);
  try {
    const newSeva = await seva.save();
    res.status(201).json(newSeva);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET slots for specific seva
router.get('/:id/slots', async (req, res) => {
  try {
    const seva = await Seva.findById(req.params.id);
    if (!seva) return res.status(404).json({ message: 'Seva not found' });
    res.json({ availableSlots: seva.slots || 10 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST book seva
router.post('/book', async (req, res) => {
  const { sevaId, devoteeName, date, totalAmount } = req.body;
  // In real app, create booking model, reduce slots
  res.status(201).json({
    id: Date.now(),
    sevaId,
    devoteeName,
    date,
    totalAmount,
    status: 'confirmed',
    bookedAt: new Date().toISOString()
  });
});

module.exports = router;

