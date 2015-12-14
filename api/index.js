var $ = module.exports = {};

//Load the request module
var requestify = require('requestify');

$.authorize = function(apiKey){
    requestify.post('http://localhost:3030/authorize', {
        key: 'lkasjdf7s6d7f'
    })
        .then(function(response) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.getBody();
        });
};

$.postFile = function(file){
    //POST FILE
};

$.getFile = function(id){
    //GET FILE
};

$.getTotalStorageUsed = function(){
    //GET REMAINING SPACE
};

$.getStorageUsedByCust = function(String, custId){
    //GET REMAINING SPACE OF CUSTOMER
};

