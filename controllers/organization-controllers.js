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

module.exports.searchOrg = function(request, response) {
    console.log(request.body);
    Organization.find({name: request.body.searchKey}, function(err, data){
        if(err)
            return response.status(400).json({error: err});
        console.log(data);
        return response.status(200).json({               
            orgData: data
      });
    })
}

