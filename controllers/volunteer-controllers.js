var Volunteer = require('./../models/Volunteer.js');

module.exports.dashboard = function(request, response) {
    Volunteer.findOne({_id: request.params.volunteerID}, function(err, data){
        if(err)
            return response.status(400).json({error: err});
        response.render('volunteer_dashboard.ejs',{
            title: data.name,
            email: data.email,
            address: data.address,
            rating: data.rating
        });
    })
}
