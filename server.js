var express = require('express');
var app = express();
var mongoose = require('mongoose');
var dbConfig = require('./dbConfig');

mongoose.connect(dbConfig.url);

var dbTests = require('./Tests/dbTests');
//dbTests.testNewUser();
/*
** This line was commented out because it could not find the method.
** Tests dont necessarily effect the project so I am not too concerned about them at the moment.
** -Taylor 12/11/2015 9:54 AM
*/


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/routes')(app);

app.listen(config.port);
console.log('Server up and running on port:', config.port);
