const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  defaultReps: {
    type: Number,
    default: 10
  },
  defaultWeight: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Equipment', equipmentSchema);