//########### Import packages & Declare Variables #############
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db_url = "mongodb://" + process.env.IP + ":27017";
var passport = require('passport');
//Init App
var app = express();
//Set up server
var server = http.Server(app);
var io = require('socket.io')(server);


//Connect mongoose
mongoose.connect(db_url + "/vhub");
mongoose.connection.on('error', function(error) {
  console.log('Could not connect to MongoDB');
});

//################### Chat ################################
var Chatroom = require('./models/Chatroom.js');
var User = require('./models/User.js');
mongoose.connection.once('open', function() {
  // WARNING DONOT UNFOLD
  io.on('connection', function(socket) {
    // YE BE WARNED
    socket.on('searchroom', function(data) {
      // emits the the new updated record
      var emitLatest = function() {
        Chatroom.find({ name: data.roomname }, function(err, res) {
          if (err) {
            throw err;
          }
          io.emit('foundroom', res);
        });
      };
      Chatroom.find({ name: data.roomname }, function(err, res) {
        if (err) {
          throw err;
        }
        if (res.length <= 0) {
          var new_chatroom = new Chatroom({ name: data.roomname, members: [{ name: data.name }], chats: [] });
          new_chatroom.save(function(err, res) {
            if (err){
              console.log("SEND CHATROOM NAME BLYAAAAT!");
            }
              emitLatest();
          });
        }
        else if (!res[0].members.find(o => o.name === data.name)) {
          Chatroom.update({ name: data.roomname }, { $addToSet: { members: { name: data.name } } }, function() {
            emitLatest();
          });
        }
        else {
          socket.emit('foundroom', res);
        }
      });
    });
  
  
  // CHANGED PART
    socket.on('userlogin', function(userId) {
      User.find({ userid: userId }, function(err, res) {
        if (res.length < 0) {
          console.log("User not found in user database");
        }
        else {
          var usernameT = res[0].username;
          Chatroom.find(function(err, result) {
            if (err) {
              throw err;
            }
            var sendthis = {data: result,
              username: usernameT   
            };
            console.log(result);
            //Emmit messages
            socket.emit('userlogged', sendthis);
          });
        }
      });

    });

    //Hande input events
    socket.on('chatinput', function(data) {
      let chatroomname = data.chatroomname;
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if (name == '' || message == '') {
        console.log(data);
      }
      else {
        // Insert message
        Chatroom.update({ name: chatroomname }, { $addToSet: { chats: { name: name, message: message } } }, function() {
          io.emit('output', [data]);
        });
      }
    });
  });

});


//##################### Middlewares ##########################
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//get static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendors'));
//SOCKET IO CONNECTION

// Passport Config
//require('./config/passport.js')(passport);

//######################## Routes ############################
app.get('/', function(request, response) {
  response.render('index.ejs', {
    title: "Home | V-Hub"
  });
});

app.get('/chatroom', function(request, response) {
  response.render('chatroom.ejs', {
    title: "Chat Room"
  });
});

require('./routes/pre-routes.js')(app);
require('./routes/event-routes.js')(app);
require('./routes/volunteer-routes.js')(app);
require('./routes/organization-routes.js')(app);


//######### Server Listen to port ##########
server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function() {
  console.log('Server running');
});