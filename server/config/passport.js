var passport = require('passport'),
    mongoose = require('mongoose'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = mongoose.model('User');

module.exports = function() {
    passport.use(new GoogleStrategy({
        clientID: '438135364786-l38cg3n12f9mm0bl656n53gq831gq2k9.apps.googleusercontent.com',
        clientSecret: '_URpNptPsxxypwbyyVyP0SlZ',
        callbackURL: 'http://localhost:3030/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        done();
        //User.findOne({googleId: profile.id}.exec(function(err, user) {
        //    console.log(err.toString());
        //    return done(err, user);
        //}));
    }));

    passport.serializeUser(function(user, callback){
        callback(null, user.id);
    });

    passport.deserializeUser(function(user, callback){
        callback(null, user.id);
    });
};
