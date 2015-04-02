var mongoose = require("mongoose");
require("./db");
var User = mongoose.model("User");

function _checkUser(user,password,callback){
  User.findOne({userName : user },function(err,foundUser){
    if(err) {
      return callback(err);
    }
    if(foundUser != null && foundUser.password === password){
      callback(null,true);
    } else
    {
      callback(null,false);
    }
  })
}

function _addUser(name, pw,callback){
  User.create({userName: name, password: pw},function(err,newUser){
    if(err){
      return callback(err);
    }
    callback(null,newUser);
  })
}

module.exports = {
  checkUser : _checkUser,
  addUser: _addUser
}

