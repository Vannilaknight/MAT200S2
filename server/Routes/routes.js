//will be fleshed out later when access to db and stuff is available
//need to add user creation, edit, deletion at later date

exports.index = function(req, res){
    res.send('Index page');
}


exports.user = function(req, res){
    res.send('user page');
}


exports.login = function(req, res){
    res.send('login');
}
exports.loginPost = function(req, res){
    //post information for user login
}

exports.logout = function(req, res){
    res.send('logout');
}