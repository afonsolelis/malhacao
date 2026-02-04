const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  exercises: [{
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true
    },
    reps: {
      type: Number,
      required: false
    },
    weight: {
      type: Number,
      required: false
    },
    sets: {
      type: Number,
      required: false,
      default: 3
    },
    durationMinutes: {
      type: Number,
      required: false
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
