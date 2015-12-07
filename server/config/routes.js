var fileManager = require('../Utilities/fileManager');

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
};