/**
 * Created by Weezy on 12/4/2015.
 */

var rsa = require('encryption'),
    filereader = require('filereader');

exports.decryptFile = function (req, res, next) {
    var fr = new FileReader(),
        file = req.body.requestedFile,
        ecrypted = '',
        decrypted = '';

        encrypted = fr.readAsBinaryString(file);

        for( var i = 0; i <= encrypted.length; i += 1) {
            var holder = rsa.decrypt(encrypted[i], d, n);
            decrypted.push(holder);
        }
};

