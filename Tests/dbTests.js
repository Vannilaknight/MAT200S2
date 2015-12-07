var mongoDB = require('../server/config/mongoDB');

module.exports =
{
    testNewUser: function () {
        var testUser = mongoDB.CreateUser('test', '123', 'test', 'McTest', 'test@test.test', 'none');
        console.log(testUser);
    },

        testSaveUser: function () {

        }
}