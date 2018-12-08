module.exports = function(app) {
  var pre = require('./../controllers/pre-controllers.js');
  app.get('/pre/login', pre.login);
  app.get('/pre/volunteer/signup', pre.vol_signup);
  app.get('/pre/chat', pre.chat);
  app.get('/pre/organization/signup', pre.org_signup);
  app.post('/pre/save/volunteer', pre.vol_save);
  app.post('/pre/save/organization', pre.org_save);
  app.get('/pre/search', pre.search);
};