/**
 * Created by Wayne 12/11/15
 */
var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    filePath: String,
    fileName: String
});

var Files = mongoose.model('Files', fileSchema);

function createDefaults() {
    Files.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Files.create({filePath: "uploads/uploads/test.txt.json", fileName: "TestFile"});
        }
    });
}

exports.devFile = createDefaults;