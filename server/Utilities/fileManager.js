var RSA = require('encryption'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    getDirName = require('path').dirname;

function writeFile(path, file, callback) {
    mkdirp(getDirName(path), function(err) {
        if(err) { callback(err); }
        var fstream = fs.createWriteStream(path);
        file.pipe(fstream);
        fstream.on('close', function () {
            callback({success: true});
        });
    });
}

function readFile(path, callback) {
    fs.readFile(path, function(err, data) {
        if(err) { callback(err); }
        callback(data);
    });
}

exports.writeFile = writeFile;