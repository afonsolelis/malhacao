const express = require('express');
const router = express.Router();
const { getStats } = require('../../controllers/dashboardController');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
router.get('/stats', getStats);

module.exports = router;