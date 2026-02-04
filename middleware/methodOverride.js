const methodOverride = require('method-override');

// Method override middleware
app.use(methodOverride('_method'));

module.exports = app;