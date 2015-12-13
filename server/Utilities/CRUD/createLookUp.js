var lookUpTable = require('mongoose').model('Files');

exports.createLookUp = function(path, fileName) {
    var thisFile = {filePath: path, fileName: fileName};
    lookUpTable.create(thisFile, function(err, thisFile) {
        if(err)
            console.error(err);
    });
};
