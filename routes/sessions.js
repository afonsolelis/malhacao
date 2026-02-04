const express = require('express');
const router = express.Router();
const WorkoutSession = require('../models/WorkoutSession');
const Workout = require('../models/Workout');

// @desc    Get all workout sessions
// @route   GET /sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await WorkoutSession.find().populate('workoutId').sort({ date: -1 });
    res.render('sessions/index', { sessions, title: 'Sessions - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Show workout session form
// @route   GET /sessions/start/:workoutId
router.get('/start/:workoutId', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId).populate('exercises.equipmentId');
    if (!workout) {
      return res.status(404).send('Workout not found');
    }
    
    // Create a new session with the workout exercises
    const session = {
      workoutId: workout._id,
      name: workout.name,
      exercises: workout.exercises.map(exercise => ({
        ...exercise.toObject(),
        completed: false
      }))
    };
    
    res.render('sessions/session', { session, title: 'Workout Session - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Create new workout session
// @route   POST /sessions
router.post('/', async (req, res) => {
  try {
    const sessionData = {
      workoutId: req.body.workoutId,
      completedExercises: req.body.exercises.map(ex => ({
        equipmentId: ex.equipmentId,
        reps: ex.reps !== undefined && ex.reps !== '' ? parseInt(ex.reps, 10) : undefined,
        weight: ex.weight !== undefined && ex.weight !== '' ? parseFloat(ex.weight) : undefined,
        durationMinutes: ex.durationMinutes !== undefined && ex.durationMinutes !== '' ? parseInt(ex.durationMinutes, 10) : undefined,
        completed: ex.completed === 'true'
      })),
      notes: req.body.notes || ''
    };

    await WorkoutSession.create(sessionData);
    res.redirect('/sessions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    View workout session details
// @route   GET /sessions/:id
router.get('/:id', async (req, res) => {
  try {
    const session = await WorkoutSession.findById(req.params.id).populate({
      path: 'workoutId completedExercises.equipmentId'
    });
    
    if (!session) {
      return res.status(404).send('Session not found');
    }
    
    res.render('sessions/view', { session, title: 'Session Details - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
