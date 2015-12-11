var RSA = require('encryption'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    getDirName = require('path').dirname,
	//RSAVars = RSA.generate(); //TODO: User RSA Variables
	RSAVars = { n: 1591, e: 191, d: 95 };

function writeFile(filename, file, callback) {
	var path = 'uploads/' + filename + '.json';

    mkdirp(getDirName(path), function(err) {
        if(err) { callback(err); } //TODO: Error Handling

        var buffer = file._readableState.buffer[0];

		var eFile = {
			fileName: filename,
			contentType: 'text/plain',
			charset: 'UTF-8',
			data: []
		};

        for(var i = 0; i < buffer.length; i++) {
           eFile.data[i] = RSA.encrypt(buffer[i], RSAVars.n, RSAVars.e).value;
        }

	    fs.writeFile(path, JSON.stringify(eFile), function(err) {
		    if(err) { callback(err); } //TODO: Error Handling

		    callback();
	    });
    });
}

function readFile(path, callback) {
    fs.readFile(path, function(err, data) {
        if(err) { callback(err); } //TODO: Error Handling

        var eFile = JSON.parse(data.toString());
	    var eFileData = eFile.data;

	    // Presets for Txt Files
	    var file = {
			contentDisposition: 'attachment; filename='+eFile.fileName,
		    contentType: eFile.contentType,
		    charset: eFile.charset,
		    data: ''
	    };

        for(var i = 0; i < eFileData.length; i++) {
            file.data += String.fromCharCode(RSA.decrypt(eFileData[i], RSAVars.d, RSAVars.n));
        }

        callback(file);
    });
}

exports.writeFile = writeFile;
exports.readFile = readFile;
