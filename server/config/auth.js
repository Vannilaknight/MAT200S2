var passport = require('passport');

exports.authenticateWithGoogle = function(req, res, next) {
    var auth = passport.authenticate('google', {scope: ['profile', 'email']}, function(err, user) {
        if(err) { return next(err); }
        if(!user) {
            res.send({success: false});
        }
        req.login(user, function(err) {
            if(err) { return next(err); }
            res.send({success: true, user: user});
        })
    });
    auth(req, res, next);
};

exports.googleAuthCallback = function(req, res, next) {
    res.redirect('/');
};