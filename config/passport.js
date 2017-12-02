// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mongoose = require('mongoose'),
    Users = mongoose.model('Users');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        regno : 'regno',
        userpwd : 'userpwd',
        email: 'email',
        phone: 'phone',
        name: 'name',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, regno, userpwd, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.regno' :  regno }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That user is already registered.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.name    = name;
                newUser.email    = email;
                newUser.regno    = regno;
                newUser.phone   = phone;
                var questions = [];
                for(var i=0; i<10; i++)
                  var random = Math.floor((Math.random() * 20) + 1);
                  if(questions.includes(random))
                    i--;
                  else
                    questions.push(random);
                newUser.questions = questions;
                newUser.userpwd = newUser.generateHash(userpwd);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

};