var express = require('express');
    //routes = require('./server/Routes/routes.js');

var app = express();

var RSA = require('encryption');
var num = 1435;
var mongoose = require('mongoose');
var dbConfig = require('./dbConfig');
mongoose.connect(dbConfig.url);

var dbTests = require('./Tests/dbTests');
dbTests.testNewUser();


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var app = express();

var config = require('./server/config/config')[env];

console.log("Original: " + num + "\nEncrypted: " + encryptedM + "\nDecrypted: " + decryptedM);

require('./server/config/express')(app, config);
require('./server/config/routes')(app);

app.listen(config.port);
console.log('Server up and running on port:', config.port);
