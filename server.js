//########### Import packages & Declare Variables #############
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db_url = "mongodb://"+process.env.IP+":27017";

//Init App
var app = express();
//Set up server
var server = http.Server(app);


//##################### Middlewares ##########################
//Connect mongoose
mongoose.connect(db_url+"/chats");
mongoose.connection.on('error', function(error){
  console.log('Could not connect to MongoDB');
});
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//get static files
app.use(express.static(__dirname + '/public'));


//######################## Routes ############################
app.get('/', function(req,res){
    //EJS Render GOES HERE
  res.send('OK');
});


//######### Server Listen to port ##########
server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
    console.log('Server running');
});