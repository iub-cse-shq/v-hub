var Volunteer = require('./../models/Volunteer.js');
var Organization = require('./../models/Organization.js');
var User = require('./../models/User.js');

module.exports.login = function(request, response) {
    response.render('login.ejs', {
        title: "Login",
    });
};

module.exports.signin = function(request, response, next) {
    if(request.body.usertype == 'false'){  //Vol
        User.findOne({username: request.body.username},function(err, data){
            if(err)
                return response.status(400).json({error: err});
            
            if(data.password == request.body.password){
                return response.status(200).json({
                    usertype: "volunteer",
                    userID: data.userid
                });
            }
        });
    }
    else
    {

        User.findOne({username: request.body.username},function(err, data){
            if(err)
                return response.status(400).json({error: err});
            
            if(data.password == request.body.password){
                return response.status(200).json({
                    usertype: "organization",
                    userID: data.userid
                });
            }
        });
    }
};

module.exports.vol_signup = function(request, response) {
    response.render('volunteer_signup.ejs', {
        title: "Signup | Volunteer",
        errors:[]
    });
};
module.exports.chat = function(request, response) {
    response.render('chatRoom.ejs', {
        title: "Chatroom",
        user: "AKIB SISTER FINISH AUTHENTICATION"
    });
};
module.exports.org_signup = function(request, response) {
    response.render('organization_signup.ejs', {
        title: "Signup | Organization"
    });
};

module.exports.vol_save = function(request, response) {
    var new_volunteer = new Volunteer({
        name: request.body.name,
        email: request.body.email,
        age: request.body.age,
        sex: request.body.sex,
        image: request.body.image,
        address: request.body.address,
        area: request.body.area,
        phone: request.body.phone
    });
    
    var errors=[];
    if(request.body.username[0] >= '0' && request.body.username[0]<= '9'){
        errors.push("Username Can't start with Numbers");
    }
    
    if(request.body.name[0] >= '0' && request.body.username[0]<= '9'){
        errors.push("Person Name Can't start with Numbers");
    }
    
    if(request.body.password != request.body.password2){
        errors.push("Passwords Don't Match");
    }
    
    
    if(errors.length > 0)
        return response.status(400).json({ error: errors });
    
    var new_user = new User({
        username: request.body.username,
        password: request.body.password,
        usertype: false
    });

    new_volunteer.save(function(err, volunteerData) {
        if (err)
            return response.status(400).json({ error: err });
        
        new_user.userid = volunteerData._id;
        new_user.save(function(err, userData){
            if(err)
                return response.status(400).json({ error: err });
            response.status(200).json({
                volunteerID: volunteerData._id
            });
        })
        
    });
};
module.exports.org_save = function(request, response) {
    var new_org = new Organization({
        name: request.body.org_name,
        email: request.body.org_email,
        address: request.body.org_address,
        area: request.body.org_area,
        phone: request.body.org_phone,
        image: request.body.org_img,
        web: request.body.org_web,
        desc: request.body.org_orgDesc
    });
    var errors=[];

    console.log(new_org);
    if(request.body.password != request.body.password2){
        errors.push("Passwords Don't Match");
    }
    
    
    if(errors.length > 0)
        return response.status(400).json({ error: errors });
    
    var new_user = new User({
        username: request.body.username,
        password: request.body.password,
        usertype: true
    });

    new_org.save(function(err, orgData) {
        if (err)
            return response.status(400).json({ error: err });
        
        new_user.userid = orgData._id;
        new_user.save(function(err, userData){
            if(err)
                return response.status(400).json({ error: err });
            response.status(200).json({
                orgID: orgData._id
            });
        })
        
    });
};
module.exports.search = function(request, response) {
  response.render('searchPage.ejs', {
        title: "Search"
    });
};