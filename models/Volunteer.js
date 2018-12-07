var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var volSchema = new Schema({
    name:{
        type: String,
        required: "Name required"
    },
    email:{
        type: String,
        required: "email required"
    },
    phone:{
        type: String,
        required: "phone required"
    },
    age:{
        type: Number,
        required: "age required"
    },
    sex:{
        type: String,
        required: "sex required"
    },
    address:{
        type: String,
        required: "address required"
    },
    area:{
        type: String,
        required: "area required"
    },
    rating:{
        type: Number,
        default: 0
    }
})
var Volunteer = mongoose.model('Volunteer', volSchema)
module.exports = Volunteer;