var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var member = new Schema({
    name: {
      type: String,
      required: "Name Required"
    }
});

var chat = new Schema({
    name: {
      type: String,
      required: "Name Required"
    },
    message: {
      type: String,
      required: "message Required"
    }
});

var chatroomSchema = new Schema({
    name: {
      type: String,
      required: "Name Required"
    },
    members: [member],
    chats: [chat]

});
var Chatroom = mongoose.model('Chatroom', chatroomSchema);
module.exports = Chatroom;