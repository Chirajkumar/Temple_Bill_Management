const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  devoteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Devotee' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Cash', 'Online', 'Cheque'], default: 'Cash' },
  description: String,
  status: { type: String, default: 'completed' },
  receiptNo: String
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);

