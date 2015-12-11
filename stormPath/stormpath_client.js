var config = require('./config');
var stormpath = require('stormpath');

var apiKey = new stormpath.ApiKey(
    config.STORMPATH_CLIENT_APIKEY_ID,
    config.STORMPATH_CLIENT_APIKEY_SECRET
);

var client = new stormpath.Client({apiKey: apiKey});
module.exports = {
    client: client
}