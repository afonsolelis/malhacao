const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  completedExercises: [{
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
    durationMinutes: {
      type: Number,
      required: false
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);
