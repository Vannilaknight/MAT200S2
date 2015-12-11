var fileManager = require('../Utilities/fileManager')
    routes = require('../Controllers/Routing.js');

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

    app.post('/authorize', function(req, res){
        console.log(req);
    });

    app.get('/user/:id', routes.index);
    app.get('/login', routes.login);
    app.post('/login', routes.loginPost);
    app.get('/logout', routes.logout);
    app.get('/', routes.index);
};