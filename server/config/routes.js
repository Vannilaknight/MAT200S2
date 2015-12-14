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
           fileManager.writeFile(filename, file, function() {
                res.redirect('/');
           });
        });
    });

    app.post('/file-download', function(req, res, next) {
        //var path = 'uploads/' + req.query.filename + '.json'; //TODO: Request Filename
        var path = 'uploads/test.txt.json';
        fileManager.readFile(path, function(file) {
            res.setHeader('Content-disposition', file.contentDisposition);
            res.setHeader('Content-type', file.contentType);
            res.charset = file.charset;
            res.write(file.data);
            res.end();
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
    app.get('/', routes.index);
};