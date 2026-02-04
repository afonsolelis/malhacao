const express = require('express');
const router = express.Router();

// @desc    Render dashboard
// @route   GET /
router.get('/', (req, res) => {
  console.log('Dashboard route hit');
  res.render('dashboard', { title: 'Dashboard - Gym Tracker' });
});

module.exports = router;