var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: {
      type: String,
      required: "Name Required"
    },
    description: {
      type: String,
      required: "location needed"
    },
    location: {
      type: String,
      required: "location needed"
    },
    startdate: {
      type: String,
      required: "date required"
    },
    starttime: {
      type: String,
      required: "starttime required"
    },
    enddate: {
      type: String,
      required: "date required"
    },
    endtime: {
      type: String,
      required: "endtime required"
    },
    image:{
      type: String,
      required: "image required"
    },
    members: [{
      memID: {
        // type: mongoose.Schema.ObjectId, 
        // ref: 'Volunteer'
        type: String
      }
    }],
    
    // members: [{
    //   memID: { type: mongoose.Schema.ObjectId, ref: 'User' },  
    //   // type: String,
    //   // required: true
    // }],
    
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