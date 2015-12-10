var fileManager = require('../Utilities/fileManager');

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
};