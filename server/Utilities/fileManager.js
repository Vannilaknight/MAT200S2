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

//var num = 1435;
//
//var RSAVars = RSA.generate();
//
//var encryptedM = RSA.encrypt(num, RSAVars.n, RSAVars.e);
//
//var decryptedM = RSA.decrypt(encryptedM, RSAVars.d, RSAVars.n);
//
//console.log("Original: " + num + "\nEncrypted: " + encryptedM + "\nDecrypted: " + decryptedM);