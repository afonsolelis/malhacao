const WorkoutSession = require('../models/WorkoutSession');
const Workout = require('../models/Workout');
const Equipment = require('../models/Equipment');

// @desc    Get dashboard data
// @route   GET /api/dashboard/stats
exports.getStats = async (req, res) => {
  try {
    // Get total workouts
    const totalWorkouts = await Workout.countDocuments();
    
    // Get sessions from this week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    
    const thisWeekSessions = await WorkoutSession.countDocuments({
      date: { $gte: startOfWeek, $lt: endOfWeek }
    });
    
    // Calculate average completion rate (simplified calculation)
    const allSessions = await WorkoutSession.find({}, { completedExercises: 1 }).lean();
    let totalExercises = 0;
    let completedExercises = 0;
    
    allSessions.forEach(session => {
      const exercises = Array.isArray(session.completedExercises) ? session.completedExercises : [];
      exercises.forEach(exercise => {
        totalExercises++;
        if (exercise.completed) {
          completedExercises++;
        }
      });
    });
    
    const avgCompletion = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
    
    // Calculate streak based on consecutive days with at least one session
    const sessionDates = await WorkoutSession.find({}, { date: 1 }).sort({ date: -1 }).lean();
    let streak = 0;

    if (sessionDates.length > 0) {
      const daySet = new Set(
        sessionDates.map(session => {
          const d = new Date(session.date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        })
      );

      const latest = new Date(sessionDates[0].date);
      let cursor = new Date(latest.getFullYear(), latest.getMonth(), latest.getDate());

      while (true) {
        const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
        if (!daySet.has(key)) break;
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      }
    }
    
    // Get recent sessions
    const recentSessions = await WorkoutSession.find()
      .populate('workoutId')
      .sort({ date: -1 })
      .limit(5)
      .lean();
    
    // Calculate missed days (no sessions) for last 7 and 30 days
    const buildMissedDays = (days) => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      start.setDate(start.getDate() - (days - 1));

      const sessionDaySet = new Set(
        sessionDates.map(session => {
          const d = new Date(session.date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        })
      );

      const missed = [];
      const cursor = new Date(start);
      for (let i = 0; i < days; i++) {
        const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
        if (!sessionDaySet.has(key)) {
          missed.push(new Date(cursor));
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      return missed;
    };

    const missedDays7 = buildMissedDays(7);
    const missedDays30 = buildMissedDays(30);

    // Prepare data for chart (last 6 months of workout counts)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // 5 months back to include current month
    
    const monthlyData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date();
      monthDate.setMonth(monthDate.getMonth() - i);
      
      // Set to first day of the month at 00:00:00
      const startDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
      // Set to first day of next month at 00:00:00
      const endDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);
      
      const count = await WorkoutSession.countDocuments({
        date: { $gte: startDate, $lt: endDate }
      });
      
      monthlyData.push({
        month: monthNames[startDate.getMonth()],
        count: count
      });
    }
    
    res.json({
      totalWorkouts,
      thisWeekSessions,
      avgCompletion,
      streak,
      recentSessions,
      monthlyData,
      missedDays7,
      missedDays30
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
