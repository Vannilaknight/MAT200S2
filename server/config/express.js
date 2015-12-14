var express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejs = require('ejs'),
    busboy = require('connect-busboy');

module.exports = function(app, config) {
    app.set('view engine', 'ejs');
    app.engine('html', ejs.renderFile);
    app.set('views', config.rootPath + '/public/');
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(busboy());
    app.use(session({ secret: 'Kim Jong Un riding a unicorn' }));
    app.use(passport.initialize());
    app.use(passport.session());
};