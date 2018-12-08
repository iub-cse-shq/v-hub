var Volunteer = require('./../models/Volunteer.js');
var Event = require('./../models/Event.js');

module.exports.create = function(request, response) {
    response.render('event_create.ejs',{
            title: "Create Event"
        });
}

// expecting to get id from whoever is making the get request
module.exports.event_single = function(request, response) {
    console.log("CAME TO THE ROUTING SHIT EVENT AAAAAAA");
    Event.findOne({ _id: request.params.id }, function(err, data) {
        if (err) {
            response.status(400).json({ error: err });
            //console.log(err);
        }
        console.log(data);
        response.render('event_dashboard.ejs', {
            event: data,
            title: data.name
        });
    });
};