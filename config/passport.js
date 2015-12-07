var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

 module.exports = function(passport) {

   // passes a user ID instead of a full object
   passport.serializeUser(function(user, callback) {
     callback(null, user.id);
   });

   // retrieves the full object by user ID
   passport.deserializeUser(function(id, callback) {
     User.findById(id, function(err, user) {
     callback(err, user);
     });
   });

   // signing up:
   passport.use('local-signup', new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true
   }, function(req, email, password, callback) {
     // look for a user with this email
     User.findOne({ 'local.email' :  email }, function(err, user) {
       if (err) return callback(err);

       // if there already is a user with this email, error message
       if (user) {
         return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
       } else {
       
       // if no user with this email, save new user

         var newUser            = new User();
         newUser.local.email    = email;
         newUser.local.password = newUser.encrypt(password);

         newUser.save(function(err) {
           if (err) throw err;
           return callback(null, newUser);
         });
       }
     });
   }));

   // logging in:
   passport.use('local-login', new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true
     }, function(req, email, password, callback) {

       // Search for a user with this email
       User.findOne({ 'local.email' :  email }, function(err, user) {
         if (err) {
           return callback(err);
         }
         // If no user is found, send error message
         if (!user) {
           return callback(null, false, req.flash('loginMessage', 'No user found.'));
         }
         // If password is wrong, send error message
         if (!user.validPassword(password)) {
           return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
         }

         // if everything is correct, callback to log in
         return callback(null, user);
       });
   }));
};
