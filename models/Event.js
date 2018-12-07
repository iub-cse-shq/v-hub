var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: {
      type: String,
      required: "Title required"
    },
    priority: {
      type: Number,
      required: "Priority required",
      min: 0,
      max:10
    },
    notes: {
      type: String,
      required: "Notes required"
    } 
    
})
var Event = mongoose.model('Event', eventSchema)
module.exports = Event;