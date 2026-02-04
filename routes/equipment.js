const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// @desc    Get all equipment
// @route   GET /equipment
router.get('/', async (req, res) => {
  try {
    const equipment = await Equipment.find().sort({ number: 1 });
    res.render('equipment/index', { equipment, title: 'Equipment - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Show add equipment form
// @route   GET /equipment/add
router.get('/add', (req, res) => {
  res.render('equipment/add', { title: 'Add Equipment - Gym Tracker' });
});

// @desc    Add equipment
// @route   POST /equipment
router.post('/', async (req, res) => {
  try {
    await Equipment.create(req.body);
    res.redirect('/equipment');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Show edit equipment form
// @route   GET /equipment/edit/:id
router.get('/edit/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).send('Equipment not found');
    }
    res.render('equipment/edit', { equipment, title: 'Edit Equipment - Gym Tracker' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Update equipment
// @route   PUT /equipment/:id
router.put('/:id', async (req, res) => {
  try {
    await Equipment.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/equipment');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @desc    Delete equipment
// @route   DELETE /equipment/:id
router.delete('/:id', async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.redirect('/equipment');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;