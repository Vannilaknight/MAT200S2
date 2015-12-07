var RSA = require('encryption'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    getDirName = require('path').dirname,
    RSAVars = RSA.generate();

function writeFile(path, file, callback) {
    mkdirp(getDirName(path), function(err) {
        if(err) { callback(err); }
        var fstream = fs.createWriteStream(path);

        var buffer = file._readableState.buffer[0];

        console.log('Decrypted: ' + buffer);

        for(var i = 0; i < buffer.length; i++) {
            buffer[i] = RSA.encrypt(buffer[i], RSAVars.n, RSAVars.e);
        }

        console.log('Encrypted: ' + buffer);

        file.pipe(fstream);
        fstream.on('close', function () {
            callback({success: true});

            readFile('uploads/visual studio code.txt', function() {});
        });
    });
}

function readFile(path, callback) {
    fs.readFile(path, function(err, data) {
        if(err) { callback(err); }

        var buffer = data;

        console.log('Encrypted: ' + buffer);

        for(var i = 0; i < buffer.length; i++) {
            buffer[i] = RSA.decrypt(buffer[i], RSAVars.d, RSAVars.n);
        }

        console.log('Decrypted: ' + buffer);

        callback(data);
    });
}

exports.writeFile = writeFile;