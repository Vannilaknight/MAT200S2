var RSA = require('encryption');
var num = 1435;
var mongoose = require('mongoose');
var dbConfig = require('./dbConfig');
mongoose.connect(dbConfig.url);
var User = require('./Schemas/User');

//var u = new User({
//    id: '12',
//    firstName:"test",
//    lastName:"tester",
//    email:"test@test.test",
//    username:"test",
//    password:"pass123",
//    FileDirectory:"null"
//})
//
//u.save(function(err){
//    if(err){
//        console.log(err);
//    }
//});

User.find(function(err, user){
    if(err){console.log(err);}
    console.log(user);
});

var RSAVars = RSA.generate();

var encryptedM = RSA.encrypt(num, RSAVars.n, RSAVars.e);

var decryptedM = RSA.decrypt(encryptedM, RSAVars.d, RSAVars.n);

console.log("Original: " + num + "\nEncrypted: " + encryptedM + "\nDecrypted: " + decryptedM);