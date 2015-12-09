var passport = require('passport'),
    mongoose = require('mongoose'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//TODO: Add the client secret in when available
module.exports = function() {
    passport.use(new GoogleStrategy({
        clientID: '438135364786-l38cg3n12f9mm0bl656n53gq831gq2k9.apps.googleusercontent.com',
        clientSecret: '_URpNptPsxxypwbyyVyP0SlZ',
        callbackURL: 'http://localhost:3030/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        //User.findOne({googleId: profile.id}.exec(function(err, user) {
        //    return done(err, user);
        //}));
    }));

    passport.serializeUser(function(user, callback){
        console.log('serializing user.');
        callback(null, user.id);
    });

    passport.deserializeUser(function(user, callback){
        console.log('deserialize user.');
        callback(null, user.id);
    });
};
