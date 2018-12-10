module.exports = function(app) {
  var event = require('./../controllers/event-controllers.js');
  app.get('/event/create', event.create);
  app.post('/event/save', event.save);
  app.get('/event/:id', event.event_single);
  app.post('/event/join', event.join);
  app.post('/search/event', event.searchEvent);
};