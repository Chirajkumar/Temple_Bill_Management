const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET room setup
router.get('/setup', async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ roomId: 1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET room bookings
router.get('/booking', async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ roomId: 1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update setup
router.put('/setup', async (req, res) => {
  try {
    const updatedRooms = req.body;
    // Update each
    const results = await Promise.all(updatedRooms.map(room => Room.findByIdAndUpdate(room._id, room, { new: true })));
    res.json({ success: true, rooms: results });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update booking
router.put('/booking', async (req, res) => {
  try {
    const updatedRooms = req.body;
    const results = await Promise.all(updatedRooms.map(room => Room.findByIdAndUpdate(room._id, room, { new: true })));
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

