const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/equipment', require('./routes/equipment'));
app.use('/workouts', require('./routes/workouts'));
app.use('/sessions', require('./routes/sessions'));
app.use('/api/dashboard', require('./routes/api/dashboard'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});