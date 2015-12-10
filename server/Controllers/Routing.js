exports.index = function(req, res){
    res.send('Index page');
};


exports.user = function(req, res){
    res.send('user page');
};


exports.login = function(req, res){
    res.send('login');
};

exports.loginPost = function(req, res){
    //post information for user login
};

exports.logout = function(req, res){
    res.send('logout');
};