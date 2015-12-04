var express = require('express'),
    routes = require('./server/Routes/routes.js');

var app = express();

var RSA = require('encryption');
var num = 1435;

var RSAVars = RSA.generate();

var encryptedM = RSA.encrypt(num, RSAVars.n, RSAVars.e);

var decryptedM = RSA.decrypt(encryptedM, RSAVars.d, RSAVars.n);

console.log("Original: " + num + "\nEncrypted: " + encryptedM + "\nDecrypted: " + decryptedM);


app.get('/', routes.index);
app.get('/user/:id', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginPost);
app.get('/logout', routes.logout);