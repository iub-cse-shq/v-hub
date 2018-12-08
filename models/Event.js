var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var image = new Schema({ id: String });

var eventSchema = new Schema({
    name: {
      type: String,
      required: "Name Required"
    },
    location: {
      type: String,
      required: "location needed"
    },
    startdate: {
      type: Date,
      required: "date required"
    },
    enddate: {
      type: Date,
      required: "date required"
    }, 
    content: {
      type: String
    },
    images: [image],
    members: [{
      type: mongoose.Schema.ObjectId, 
      ref: 'Volunteer'
    }],
    
    organization:{ 
      type: String,
      required: "Parent organization required"
    },
    status: {
      type: Boolean,
      default: false 
    } 
});
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;