var Volunteer = require('./../models/Volunteer.js');
var Organization = require('./../models/Organization.js');

module.exports.login = function(request, response) {

};

module.exports.vol_signup = function(request, response) {
    response.render('volunteer_signup.ejs', {
        title: "Signup | Volunteer"
    });
};
module.exports.chat = function(request, response) {
    response.render('chatRoom.ejs', {
        title: "Chatroom"
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

    //console.log(new_volunteer);
    new_volunteer.save(function(err, data) {
        if (err)
            return response.status(400).json({ error: err });

        response.status(200).json({
            volunteerID: data._id
        });
    });
};
module.exports.org_save = function(request, response) {
    var new_org = new Organization({
        name: request.body.org_name,
        email: request.body.org_email,
        address: request.body.org_address,
        area: request.body.org_area,
        phone: request.body.org_phone,
        web: request.body.org_web,
        desc: request.body.org_orgDesc,
        img:  request.body.org_img
    });

    console.log(new_org);
    new_org.save(function(err, data) {
        if (err)
            return response.status(400).json({ error: err });

        response.status(200).json({
            orgID: data._id
        });
    });
};
module.exports.search = function(request, response) {
  response.render('searchPage.ejs', {
        title: "Search Event, Organization or Volunteer"
    });
}
