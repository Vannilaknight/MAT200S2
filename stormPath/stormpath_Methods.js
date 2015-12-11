var application;

var user_account={
    givenName: 'Joe',
    surname: 'Stormtrooper',
    username: 'tk421',
    email: 'tk421@stormpath.com',
    password: 'Changeme1',
    customData: {
        favoriteColor: 'white'
    }
};

module.exports={
    init: function(app){
        application = app;
    },

    test_CreateUser: function() {
        application.createAccount(user_account, function (err, createdAccount) {
            if (err) {
                throw err
            }
            console.log("")
            createdAccount.createApiKey(function(err, apiKey){
                console.log('API Key:', apiKey.id);
                console.log('API Secret:', apiKey.secret);
                    var lineBreak = "-------------------";
                createdAccount.getApiKeys(function(err, col){
                    if(col.items.length == 0){
                        console.log("no keys found! YOU DID IT WRONG!!!");
                    }else{
                        console.log(col.items);
                    }
                });
            });
        });
    },

    test_RetriveUser: function(){
        application.getAccounts({ username: 'tk421' }, function(err, accounts) {
            accounts.each(function(account, callback) {
                console.log('Account:', account);
                callback();
            }, function(err) {
                console.log('Finished iterating over accounts.');
            });
        });
    },

    test_Auth: function(){
        var authRequest = {
            username: 'tk421',
            password: 'Changeme1'
        };

        application.authenticateAccount(authRequest, function(err, result) {
            // If successful, the authentication result will have a method,
            // getAccount(), for getting the authenticated account.
            result.getAccount(function(err, account) {
                console.log('Account:', account);
            });
        });
    },

    CreatAccound: function(user){
        application.createAccount(user, function (err, createdAccount) {
            if (err) {
                throw err
            }
            var key = null;
            console.log("Account created.");
            createdAccount.createApiKey(function(err, apiKey){
                console.log('API Key:', apiKey.id);
                console.log('API Secret:', apiKey.secret);

                createdAccount.getApiKeys(function(err, col){
                    if(col.items.length == 0){
                        console.error('Error: No key found!');
                    }else{
                        key = col.items[0];
                    }
                })
            })
            //this returns a key that look like:
            //{href:string, the path to where it is stored.
            // id:string, the actual key
            // secret:string,  the key secret
            // status:string,  active or not (enum string representation)
            // account:object  the user it is tied to
            // }
            return key;
        });
    },

    RetrieveUser: function(username){
        application.getAccounts({username: username}, function(err, accounts){
            if(err){throw err}
            return accounts;
        })
    },
    /**
     * @description returns all API keys the user currently has
     * @param account; a user account
     */
    getUserKeys: function(account){
        account.getApiKeys(function(err, collection){
            if(collection.items.length == 0) {
                return null;
            }else{
                return collection.items;
            }
        });
    },

    Auth: function(username, password){
        var authRequest = {
            username: username,
            password: password
        };

        application.authenticateAccount(authRequest, function(err, result) {
            // If successful, the authentication result will have a method,
            // getAccount(), for getting the authenticated account.
            result.getAccount(function(err, account) {
                if(err){throw err}
                return account;
            });
        });
    },

    PasswordResetRequest: function(email){
        //NOTE: this is only part of the tutorial... may remove later...

        application.sendPasswordResetEmail({ email: email }, function(err, passwordResetToken) {
            // The token is the last part of the HREF.
            console.log(passwordResetToken.href.split('/').pop());

            // The account can be retrieved by using the getAccount() method.
            client.getAccount(passwordResetToken.account.href, function(err, account) {
                console.log('Account:', account);
            });
        });
    },

    ResetPassword: function(token, password){
        //NOTE: this is only part of the tutorial... may remove later...

        application.resetPassword(token, password, function(err, result) {
            if (err) {
                // The token has been used or is expired - have the user request a new token.
                return console.error(err);
            }

            // The response contains a link to the account which is
            // associated with this password reset workflow.
            console.log('Account HREF:', result.account.href);
        });
    }
}