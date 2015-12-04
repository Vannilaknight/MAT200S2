var mkdirp = require('mkdirp'),
    fs = require('fs'),
    getDirName = require('path').dirname;

function writeFile(path, contents, callback) {
    mkdirp(getDirName(path), function(err) {
        if(err) { callback(err); }
        fs.writeFile(path, contents, callback);
    });
}

function readFile(path, callback) {
    fs.readFile(path, function(err, data) {
        if(err) { callback(err); }
        callback(data);
    });
}

exports.writeFile = writeFile;

var num = 1435;



var RSAVars = RSA.generate();

var encryptedM = RSA.encrypt(num, RSAVars.n, RSAVars.e);

var decryptedM = RSA.decrypt(encryptedM, RSAVars.d, RSAVars.n);

console.log("Original: " + num + "\nEncrypted: " + encryptedM + "\nDecrypted: " + decryptedM);