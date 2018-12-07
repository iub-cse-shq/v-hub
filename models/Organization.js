var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var orgSchema = new Schema({
    name:{
        type: String,
        required: "Name required"
    },
    email:{
        type: String,
        required: "email required"
    },
    phone:{
        type: Number,
        required: "phone required"
    },
    web:{
        type: String,
        required: "website required"
    },
    address:{
        type: String,
        required: "address required"
    },
    area:{
        type: String,
        required: "area required"
    },
    desc:{
        type: String,
        required: "description required"
    }
})
var Organization = mongoose.model('Organization', orgSchema)
module.exports = Organization;