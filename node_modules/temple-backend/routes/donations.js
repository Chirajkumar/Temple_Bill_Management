const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// GET all donations
router.get('/', async (req, res) => {
  try {
    const { dateRange } = req.query;
    let query = {};
    if (dateRange === 'today') {
      const today = new Date();
      today.setHours(0,0,0,0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.createdAt = { $gte: today, $lt: tomorrow };
    }
    const donations = await Donation.find(query).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create donation
router.post('/', async (req, res) => {
  const donation = new Donation(req.body);
  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

