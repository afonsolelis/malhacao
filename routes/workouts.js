const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const Equipment = require('../models/Equipment');

// @desc    Get all workouts
// @route   GET /workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.render('workouts/index', { workouts, title: 'Workouts - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Show add workout form
// @route   GET /workouts/add
router.get('/add', async (req, res) => {
  try {
    const equipment = await Equipment.find().sort({ number: 1 });
    res.render('workouts/add', { equipment, title: 'Add Workout - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Add workout
// @route   POST /workouts
router.post('/', async (req, res) => {
  try {
    await Workout.create(req.body);
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Show edit workout form
// @route   GET /workouts/edit/:id
router.get('/edit/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    const equipment = await Equipment.find().sort({ number: 1 });
    
    if (!workout) {
      return res.status(404).send('Workout not found');
    }
    
    res.render('workouts/edit', { workout, equipment, title: 'Edit Workout - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Update workout
// @route   PUT /workouts/:id
router.put('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Delete workout
// @route   DELETE /workouts/:id
router.delete('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;