module.exports = function(app) {
  var event = require('./../controllers/event-controllers.js');
  app.get('/event/create', event.create);
  app.get('/event/:id', event.event_single);
};