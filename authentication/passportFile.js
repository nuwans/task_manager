var LocalStrategy = require('passport-local').Strategy;
var User= require('../Models/User');

module.exports = function(app,passport) {

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(user, done){
		User.findOne({'_id':user._id}, function(err, user){
			done(err, user);
		});
		
	});

};