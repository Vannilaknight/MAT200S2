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
        SaveUser: function (user) {
            user.save(function (err) {
                if (err) {
                    console.log("An error occurred when trying to save to the database.")
                    console.log('Error: ' + err);
                }
            });
            console.log("User saved Successfully.");
        },


    /**
     * @param username
     */
        findUser: function (username) {
            User.find({username: username}, function (err, u) {
                if (err) {
                    console.log('Error: ' + err)
                }

                return u;
            });
        },

    /**
     * @param userUpdated; the new user to be saved, user.id is used to find the original user
     */
        UpdateUser: function (userUpdated) {
            User.findById(userUpdated.id, function (err, user) {
                if (err) {
                    console.log("Error: " + err)
                }
                ;

                user.username = userUpdated.username;
                user.email = userUpdated.email;
                user.firstName = userUpdated.firstName;
                user.lastName = userUpdated.lastName;
                user.FileDirectory = userUpdated.FileDirectory;
                user.password = userUpdated.password;
            });
        }
}