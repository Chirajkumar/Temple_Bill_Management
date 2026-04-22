const mongoose = require('mongoose');

const sevaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: Number, // minutes
  slots: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Seva', sevaSchema);

