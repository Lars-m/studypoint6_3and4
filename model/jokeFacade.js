var mongoose = require("mongoose");
require("./db");
var Joke = mongoose.model("Joke");

function _getRandomJoke(callback){
  //This can be done smarter, use Google
  Joke.find(function(err,allJokes){
    if(err){
      return callback(err);
    }
    if(allJokes.length === 0){
      return callback(null,null);
    }
    var index = Math.floor(Math.random() * allJokes.length);
    callback(null,allJokes[index]);
  });
}

function _addJoke(joke,callback){
  Joke.create(joke,function(err,newJoke){
    if(err) {
      return callback(err);
    }
    callback(null,newJoke);
  })
}

function __allJokes(callback){
  Joke.find(function(err,all){
    if(err){
      return callback(err);
    }
    callback(null,all);
  })
}

module.exports = {
  allJokes : __allJokes,
  getRandomJoke : _getRandomJoke,
  addJoke : _addJoke
}

