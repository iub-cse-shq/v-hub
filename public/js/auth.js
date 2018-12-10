module.exports = {
    ensureAuthenticated: function(request, response, next){
        if(request.isAuthenticated()){
            return next();
        }
        response.status(400).json({msg: "Not Authorised"});
    }
}