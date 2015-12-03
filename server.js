var RSA = require('encryption');
var num = 1435;

var RSAVars = RSA.generate();

var encryptedM = RSA.encrypt(num, RSAVars.n, RSAVars.e);

var decryptedM = RSA.decrypt(encryptedM, RSAVars.d, RSAVars.n);

console.log("Original: " + num + "\nEncrypted: " + encryptedM + "\nDecrypted: " + decryptedM);