module.exports = function(app) {
  var organization = require('./../controllers/organization-controllers.js');
  app.get('/organization/:orgID', organization.dashboard);
  app.get('/search', organization.search);
}
