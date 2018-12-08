var Volunteer = require('./../models/Volunteer.js');
var Event = require('./../models/Event.js');

module.exports.create = function(request, response) {
    response.render('event_create.ejs',{
            title: "Create Event"
        });
}

module.exports.save = function(request, response) {
    var new_event = new Event({
        name: request.body.name,
        description: request.body.description,
        location: request.body.location,
        image: request.body.image,
        startdate: request.body.startdate,
        enddate: request.body.enddate,
        organization: request.body.organization,
        starttime: request.body.starttime,
        endtime: request.body.endtime,
    });
    
    new_event.save(function(err, data) {
        if (err)
            return response.status(400).json({ error: err });

        response.status(200).json({
            event: data._id
        });
    });
}
//https://v-hub-shamahoque.c9users.io/event/5c0bcf422fcbb86c9dc418aa
// expecting to get id from whoever is making the get request
module.exports.event_single = function(request, response) {
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
module.exports.searchEvent = function(request, response) {
    console.log(request.body.searchKey);
    Volunteer.find({name: request.body.searchKey}, function(err, data){
        if(err)
            return response.status(400).json({error: err});
        console.log(data);
        return response.status(200).json({               
            eventData: data
      });
    })
}
