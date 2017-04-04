"use strict";
var User= require('../Models/User');
var LocalStrategy = require('passport-local').Strategy;

var uuid=require('uuid');
module.exports = function (app,passport) {
    passport.use('local-signup',new LocalStrategy({
            usernameField: 'Username',
            passwordField: 'Password',
            passReqToCallback: true },
            function(req,Username,Password,done){
                console.log(Username);
                console.log(Password);
                process.nextTick(function(){
                    User.findOne({ 'Username' : Username}, function(err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);
                        if(user){
                            return done(null, false, {message:'That username already taken'});
                        }
                        if(!user) {
                            var user=new User();
                            user.Username=Username;
                            user.Password=Password;
                            user.save(function(err) {
                                if (err){
                                    throw err;
                                } else{
                                    return done(null,user);
                                }
                            });
                        }
                    }); 
               });
            }
        )
    );
    app.post('/user/signup',function(req,res,next){
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) { return res.send(err); }
            if (!user) { return res.send({error:info}); }
            if(user){
                res.json(user).end();
            }
        })(req, res, next);
    });
    
    passport.use('local-login',new LocalStrategy({
            usernameField: 'Username',
            passwordField: 'Password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },function (req,Username, Password, done) {
               process.nextTick(function(){
                    User.findOne({ 'Username': Username }, function (err, User) {
                        if (err) { return done(err); }
                        if (!User) { return done(null, false, { message: "User not found !" }); }
                        if (!User.validPassword(Password)) { return done(null, false, { message: "Invalid Password !" }); }
                        return done(null, User);
                    });
               });
                
            })
    );
    app.post('/user/login', function(req,res,next){
        passport.authenticate('local-login', function (err, user, info) {
            if (err) { return res.send(err); }
            if (!user) { return res.send({error:info}); }
            req.logIn(user, function (err) {
                if (err) { return res.send(err); }
                return res.json(user).end();
            });
        })(req, res, next);
     }
    );
}