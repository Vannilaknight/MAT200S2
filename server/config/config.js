var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://safespace:BullyPr00fWindows@ds027385.mongolab.com:27385/safespace',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://safespace:Password123@ds063134.mongolab.com:63134/safespace',
        port: process.env.PORT || 80
    }
};