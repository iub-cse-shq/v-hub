var Volunteer = require('./../models/Volunteer.js');
var Event = require('./../models/Event.js');
var Organization = require('./../models/Organization.js');

module.exports.create = function(request, response) {
    response.render('event_create.ejs',{
        title: "Create Event"
    });
}

module.exports.save = function(request, response) {
    
    Organization.findOne({_id: request.body.organization}, function(err, data){
        if(err)
            return response.status(400).json({error: err})
        
        var new_event = new Event({
            name: request.body.name,
            description: request.body.description,
            location: request.body.location,
            image: request.body.image,
            startdate: request.body.startdate,
            enddate: request.body.enddate,
            organization: data.name,
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
        
    });
}
//https://v-hub-shamahoque.c9users.io/event/5c0bcf422fcbb86c9dc418aa
// expecting to get id from whoever is making the get request
module.exports.event_single = function(request, response) {
    Event.findOne({ _id: request.params.id }, function(err, data) {
        if (err) {
            response.status(400).json({ error: err });
        }
        response.render('event_dashboard.ejs', {
            event: data,
            title: data.name,
            eventID: request.params.id
        });
    });
};

module.exports.join = function(request, response) {
    /*
    var userObj={
        // members: request.body.userID
        memID: request.body.userID
    }
    */
    Event.findOneAndUpdate({_id: request.body.eventID}, {$push:{members:request.body.userID}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });
    return response.status(200).json({eventID: request.body.eventID});
    
   
   
};

module.exports.searchEvent = function(request, response) {
    Event.find({name: request.body.searchKey}, function(err, data){
        if(err)
            return response.status(400).json({error: err});
        console.log(data);
        return response.status(200).json({               
            eventData: data
      });
    });
};
