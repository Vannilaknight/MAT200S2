var lookUpTable = require('mongoose').model('Files');

exports.findPath = function(Id, callback) {
    lookUpTable.findOne({_id: Id}, function (err, path) {
        if (err) {
            return console.error(err);
        }
        console.log('path ' + path.filePath);
        if (path != null && path != '' ) {
            callback(path.filePath);
        }
    });
};
