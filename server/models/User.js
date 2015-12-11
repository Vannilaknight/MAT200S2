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