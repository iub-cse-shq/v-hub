var Organization = require('./../models/Organization.js');

module.exports.dashboard = function(request, response) {
    Organization.findOne({_id: request.params.orgID}, function(err, data){
        if(err)
            return response.status(400).json({error: err});

        response.render('organization_dashboard.ejs',{
            title: data.name,
            email: data.email,
            web: data.web,
            address: data.address
        });
    })
}
module.exports.search = function(request, response) {
  response.render('searchPage.ejs', {
        title: "Search Event, Organization or Volunteer"
    });
}

