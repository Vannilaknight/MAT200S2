var passport = require('passport'),
    fileManager = require('../Utilities/fileManager'),
    auth = require('./auth'),
    routes = require('../Controllers/Routing');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('app/general/landing-page.ejs');
    });

    app.get('/profile', function(req, res) {
        res.render('app/account/profile.ejs', {
            profileInfo: {
                name: 'jleininger'
            }
        });
    });

    app.get('/:user/getFileList', function(req, res) {
        //TODO: This is all test stuff. Replace with real stuff later.
        res.contentType('json');
        res.send({
            files: [
                'expense report.txt',
                'diploma.txt',
                'otherReport.txt'
            ]
        });
    });

    app.post('/fileUpload', function(req, res, next) {
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename) {
           fileManager.writeFile('uploads/' + filename, file, function() {
                res.redirect('/');
           });
        });
    });

    app.get('/user/:id', routes.index);
    app.get('/login', auth.authenticateWithGoogle);
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/authFail' }),
        function(req, res) {
            res.redirect('/');
        });
    app.get('/authFail', function(req, res) {
       console.log('authentication failed');
        res.redirect('/');
    });
    app.get('/logout', routes.logout);
};