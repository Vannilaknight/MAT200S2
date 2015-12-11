var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    filePath: String,
    fileId: String
});

var Files = mongoose.model('Files', fileSchema);

function createDefaults() {
    Files.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Files.create({filePath: "uploads/test.txt", fileId: "1"});
        }
    });
}

exports.devFile = createDefaults;