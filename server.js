//########### Import packages #############
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

//Init App
var app = express();
//Set up server
var server = http.Server(app);

//############# Middlewares ################
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//############### Routes ###################
app.get('/', function(req,res){
    //EJS GOES HERE
  res.send('OK');
});


//######### Server Listen to port ##########
server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
    console.log('Server running');
});
