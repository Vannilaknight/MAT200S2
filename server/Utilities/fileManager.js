var RSA = require('encryption'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    getDirName = require('path').dirname,
    RSAVars = RSA.generate();

function writeFile(path, file, callback) {
    mkdirp(getDirName(path), function(err) {
        if(err) { callback(err); }
        var fstream = fs.createWriteStream(path);

        var buffer = file._readableState.buffer[0],
            test = 'o';

        for(var i = 0; i < buffer.length; i++) {
            //var start = String.fromCharCode(parseInt((buffer[i]), 16));
            //console.log(parseInt(buffer[i], 10));
            //console.log(start.charCodeAt(0));
            //console.log("e " + parseInt(buffer[i], 10));
            buffer[i] = RSA.encrypt( (parseInt(buffer[i], 10)) , RSAVars.n, RSAVars.e);
        }
        console.log(buffer.toString());

        file.pipe(fstream);
        fstream.on('close', function () {
            callback({success: true});

            readFile('uploads/test.txt', function() {});
        });
    });
}

function readFile(path, callback) {
    fs.readFile(path, function(err, data) {
        if(err) { callback(err); }

        var buffer = data,
            decrypted = [];

        for(var i = 0; i < buffer.length; i++) {
            decrypted[i] = String.fromCharCode(RSA.decrypt(parseInt(buffer[i], 10), RSAVars.d, RSAVars.n));
        }
        console.log(decrypted.toString());
        callback(data);
    });
}

exports.writeFile = writeFile;