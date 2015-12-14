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
        User.findOne({
            'googleId': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Google
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    google: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
