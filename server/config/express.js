var express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    busboy = require('connect-busboy');

module.exports = function(app, config) {
    app.set('view engine', 'ejs');
    app.engine('html', ejs.renderFile);
    app.set('views', config.rootPath + '/public/');
    app.use(express.static('public'));
    app.use(bodyParser());
    app.use(busboy());
};