//DB stuff goes here
var User = require('../../Schemas/User');

module.exports ={
    /**
     * @param username
     * @param password
     * @param fName
     * @param lName
     * @param email
     * @param fileDir
     * @constructor
     */
    CreateUser: function (username, password, fName, lName, email, fileDir) {
        var user = new User({
            id: 1,
            username: username,
            password: password,
            firstName: fName,
            lastName: lName,
            email: email,
            FileDirectory: fileDir
        });

        return user;
    },

    /**
     * @param user; this is intended a new User created from the db schema
     * @description: Save a user to the database
     */
        SaveUser: function (user, successCallback, FailCallback) {
            user.save(function (err) {
                if (err) {
                    console.log("An error occurred when trying to save to the database.")
                    console.log('Error: ' + err);
                    if(FailCallback) {
                        FailCallback();
                    }
                }
                console.log("User saved Successfully.");
                successCallback();
            });
        },


    /**
     * @param username
     */
        findUserByUsername: function (username, successCallback, failCallback) {
            User.findOne({username: username}, function (err, u) {
                if (err) {
                    console.log('Error: ' + err)
                    if(failCallback) {
                        failCallback();
                    }
                }
                successCallback(u);
            });
        },

        findUserById: function(id, successCallback, failCallback){
            console.warn("Find by Id not yet Implemented");
            //User.find({id:id}), function(err, u){
            //    if(err){console.log("Error: "+err);}
            //
            //    return u;
            //}
        },

    /**
     * @param userUpdated; the new user to be saved, user.id is used to find the original user
     */
        UpdateUser: function (userUpdated, successCallback, failCallback) {
        console.log(userUpdated)
            User.findById(userUpdated._id, function (err, user) {
                if (err) {
                    console.log("Error: " + err)
                    if(failCallback){
                        failCallback();
                    }
                }else{
                    console.log(user)
                    user.username = userUpdated.username;
                    user.email = userUpdated.email;
                    user.firstName = userUpdated.firstName;
                    user.lastName = userUpdated.lastName;
                    user.FileDirectory = userUpdated.FileDirectory;
                    user.password = userUpdated.password;

                    successCallback(user);
                }
            });
        },

        DeleteUserByUsername: function(username, successCallback, failCallback){
            User.findOneAndRemove({username:username}, function(err){
                if(err) {
                    console.log("Error: " + err);
                    if(failCallback){
                        failCallback();
                    }
                }else{
                    successCallback();
                }
            });
        },

        DeleteUserById: function(id, successCallback, failCallback){
            console.warn("delete by ID is not yet Implemented.");
        }
}