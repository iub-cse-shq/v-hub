var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userid:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    
    //False-> Volunteer, True-> Org
    usertype:{
        type: Boolean,
        required: true
    },
    
    password:{
        type: String,
        required: true
    }
})
var User = mongoose.model('User', userSchema)
module.exports = User;