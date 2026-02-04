const connectDB = require('./config/db');
const Equipment = require('./models/Equipment');

// Sample equipment data
const sampleEquipment = [
  {
    number: 1,
    name: 'Bench Press',
    description: 'Flat bench press for chest exercises',
    defaultReps: 10,
    defaultWeight: 80
  },
  {
    number: 2,
    name: 'Squat Rack',
    description: 'Power rack for squats and overhead presses',
    defaultReps: 8,
    defaultWeight: 100
  },
  {
    number: 3,
    name: 'Lat Pulldown',
    description: 'Machine for latissimus dorsi exercises',
    defaultReps: 12,
    defaultWeight: 60
  },
  {
    number: 4,
    name: 'Leg Press',
    description: 'Machine for leg exercises',
    defaultReps: 15,
    defaultWeight: 120
  },
  {
    number: 5,
    name: 'Chest Fly Machine',
    description: 'Pec deck machine for chest isolation',
    defaultReps: 12,
    defaultWeight: 40
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing equipment
    await Equipment.deleteMany({});
    
    // Insert sample data
    await Equipment.insertMany(sampleEquipment);
    
    console.log('Sample equipment data inserted!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();