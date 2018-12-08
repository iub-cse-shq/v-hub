var Volunteer = require('./../models/Volunteer.js');

module.exports.dashboard = function(request, response) {
    Volunteer.findOne({_id: request.params.volunteerID}, function(err, data){
        if(err)
            return response.status(400).json({error: err});
        
        response.render('volunteer_dashboard.ejs',{
            title: data.name,
            data : data
        });
    })
}
module.exports.searchVol = function(request, response) {
    console.log(request.body.searchKey);
    Volunteer.find({name: request.body.searchKey}, function(err, data){
        if(err)
            return response.status(400).json({error: err});
        console.log(data);
        return response.status(200).json({               
            volData: data
      });
    })
}