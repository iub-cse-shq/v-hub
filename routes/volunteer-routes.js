module.exports = function(app) {
  var volunteer = require('./../controllers/volunteer-controllers.js');
  app.get('/volunteer/:volunteerID', volunteer.dashboard);
}
