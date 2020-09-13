var quizRoutes = require('./quiz_routes');

module.exports = function(app, db) {
  app.use('/api', quizRoutes);
  // Other groups of routes could go here some
};
