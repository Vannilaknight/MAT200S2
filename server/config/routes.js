var passport = require('passport'),
    fileManager = require('../Utilities/fileManager'),
    auth = require('./auth'),
    routes = require('../Controllers/Routing');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('fileUploadTest.html');
    });

    app.post('/file-upload', function(req, res, next) {
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename) {
           fileManager.writeFile('uploads/' + filename, file, function() {
                res.redirect('/');
           });
        });
    });

    app.get('/user/:id', routes.index);
    app.get('/login', auth.authenticateWithGoogle);
    app.get('/auth/google/callback', function(req, res) {
        console.log('User logged in');
        res.redirect('/');
    });
    app.get('/authFail', function(req, res) {
       console.log('authentication failed');
    });
    app.get('/logout', routes.logout);
    app.get('/', routes.index);
};