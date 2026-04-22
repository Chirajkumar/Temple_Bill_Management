const express = require('express');
const Donation = require('../models/Donation');
const router = express.Router();

// GET dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const monthly = new Date();
    monthly.setDate(1);
    monthly.setHours(0,0,0,0);
    const monthEnd = new Date(monthly.getFullYear(), monthly.getMonth() + 1, 0, 23,59,59);

    const [
      todayDonations,
      monthlyDonations,
      totalDevotees,
      totalSevas,
      unreadAlerts
    ] = await Promise.all([
      Donation.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
      Donation.aggregate([{ $match: { createdAt: { $gte: monthly, $lte: monthEnd } } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      // Add other counts
    ]);

    res.json({
      todayDonations: todayDonations,
      monthlyAchieved: monthlyDonations[0]?.total || 0,
      monthlyTarget: 500000,
      devotees: 150,
      sevasToday: 25,
      stockAlerts: 3,
      unreadAlerts: unreadAlerts || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

