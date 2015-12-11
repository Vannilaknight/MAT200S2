var mongoDB = require('../server/config/mongoDB');

function testNewUser() {
    var testUser = mongoDB.CreateUser('test', '123', 'test', 'McTest', 'test@test.test', 'none');
    console.log(testUser);
    return testUser;
}

function testSaveUser(user, callback) {
    console.log(callback)
    callback.forEach(function(call){
        mongoDB.SaveUser(user, call, null);
    });
}

function testFindByName(){
    mongoDB.findUserByUsername("test", testFindSuccess, null);
}

function testFindById(){
    mongoDB.findUserById(2, testFindSuccess, null);
}

function testFindSuccess(user){
    if(user){
        console.log("Find by Name Success")
        testUpdateUser();
    }
}

function testUpdateUser(){
    mongoDB.findUserByUsername("test", testUpdateFoundUser, null);
}

function testUpdateFoundUser(changedUser){
    var newName = "testChanged"
    changedUser.username = newName;

    mongoDB.UpdateUser(changedUser, testUpdateSuccess, testUpdateFail);
}

function testUpdateSuccess(user){
    if(user){
        console.log("Update Success!");
        testDeleteByUsername();
    }
}

function testUpdateFail(){
    console.log("failed to update");
}

function testDeleteByUsername(){
    mongoDB.DeleteUserByUsername("testChanged", testSuccess, null);
}

function testDeleteById(){
    mongoDB.DeleteUserById(1, testSuccess, null);
}

function  testSuccess(){
    console.log("Test complete, DB is fully functioning");
}

module.exports =
{
    testDB: function(){
        var u = testNewUser();
        testSaveUser(u, [testFindByName, testFindById]);
    }
}