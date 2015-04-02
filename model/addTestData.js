require("./db");

var User = require("mongoose").model("User");
var Joke = require("mongoose").model("Joke")

var sampleData = [
  {userName: "Peter", password: "secret"},
  {userName: "test", password: "test"},
  {userName: "Kurt", password: "very-secret"},
]

var sampleJokes = [
  {joke: "A day without sunshine is like, night"},
  {joke:"At what age is it appropriate to tell my dog that he's adopted?"},
  {joke: "I intend to live forever, or die trying"}
];

User.create(sampleData,function(err,users){
  if(err){
    return console.log(err);
  }
  return console.log(users);
})

Joke.create(sampleJokes,function(err,jokes){
  if(!err){
    console.log(jokes);
  }
})




