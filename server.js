//########### Import packages & Declare Variables #############
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db_url = "mongodb://"+process.env.IP+":27017";
var io = require('socket.io')(server);
//Init App
var app = express();
//Set up server
var server = http.Server(app);


//##################### Middlewares ##########################
//Connect mongoose
mongoose.connect(db_url+"/vhub");
mongoose.connection.on('error', function(error){
  console.log('Could not connect to MongoDB');
});
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//get static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendors'));
//SOCKET IO CONNECTION
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
});
});

//######################## Routes ############################
app.get('/', function(request,response){
    response.render('index.ejs', {
        title: "Home | V-Hub"
    });
});

require('./routes/pre-routes.js')(app);
require('./routes/event-routes.js')(app);
require('./routes/volunteer-routes.js')(app);
require('./routes/organization-routes.js')(app);

//######### Server Listen to port ##########
server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
    console.log('Server running');
});