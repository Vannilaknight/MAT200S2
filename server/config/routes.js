var passport = require('passport'),
    fileManager = require('../Utilities/fileManager'),
    auth = require('./auth'),
    routes = require('../Controllers/Routing');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('app/general/landing-page.ejs');
    });

    app.delete('/:path', function(req,res) {
        var path = 'uploads/' + req.user.googleId + '/' + req.params.path;
        fileManager.deleteFile(path);
        res.status(200);
        res.end();
    }),

    app.get('/profile', function(req, res) {
        res.render('app/account/profile.ejs', {
            profileInfo: {
                name: req.user.username
            }
        });
    });

    app.get('/:user/getFileList', function(req, res) {
        res.contentType('json');
        res.send({
            files: fileManager.readFileNamesInDir('uploads/' + req.user.googleId)
        });
    });


    app.post('/fileUpload', function(req, res) {
            if(req.user) {
                req.pipe(req.busboy);
                req.busboy.on('file', function (fieldname, file, filename) {
                    fileManager.writeFile(filename, file, req.user.googleId, function () {
                        res.redirect('/profile');
                    });
                });
            }
        }
    );

    app.get('/fileDownload/:filename', function(req, res) {
        var path = 'uploads/' + req.user.googleId + '/' + req.params.filename;
        fileManager.readFile(path, function (file) {
            res.setHeader('Content-disposition', file.contentDisposition);
            res.setHeader('Content-type', file.contentType);
            res.charset = file.charset;
            res.write(file.data);
            res.end();
        });
    });

    app.get('/login', auth.authenticateWithGoogle);
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/authFail' }),
        function(req, res) {
            res.redirect('/profile');
        });
    app.get('/authFail', function(req, res) {
       console.log('Google authentication failed');
        res.redirect('/');
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};