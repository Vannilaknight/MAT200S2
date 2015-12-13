var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    lookUpTable = require('../models/lookUp');

module.exports = function(config) {
    //Connection to the MongoDB database
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Safe Space db opened');
        userModel.defaultUser();
        lookUpTable.devFile();
    });
};