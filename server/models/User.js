/**
 * Created by Neal yingtonB on 12/4/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: String,
    googleId: String,
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    FileDirectory: String
});

var User = mongoose.model('User', userSchema);

function createDefaults() {
    User.find({}).exec(function (err, collection) {
        if(collection.length === 0) {
            User.create({id: "1", googleId: '', username: "Dev", password:'1dumbpass', email:'test@test.com', firstName: 'Admin', lastName: '1234', fileDirectory: 'uploads/dev'});
        }
    });
}

exports.defaultUser = createDefaults;