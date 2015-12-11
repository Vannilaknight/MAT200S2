var config = require('./config');
var stormpath_client = require('./stormpath_client').client;
var clientMethods = require('./stormpath_Methods');


var applicationHref = config.STORMPATH_APPLICATION_HREF;
stormpath_client.getApplication(applicationHref, function(err, application){
    if(err){throw err}
    console.log("stormpath client application retrieved!");

    clientMethods.init(application);

    //clientMethods.test_CreateUser();
    //clientMethods.test_RetriveUser();
    //clientMethods.test_Auth();
});

