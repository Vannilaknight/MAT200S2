var passport = require('passport'),
    fileManager = require('../Utilities/fileManager'),
    look = require('../Utilities/CRUD/searchTable.js'),
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

    app.post('/download/:id', function(req, res, next) {
        look.findPath(req.params.id, function(path) {
            fileManager.readFile(path, function(file) {
                res.setHeader('Content-disposition', file.contentDisposition);
                res.setHeader('Content-type', file.contentType);
                res.charset = file.charset;
                res.write(file.data, 'binary');
                res.end();
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
    app.get('/', routes.index);
};