global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";

require("../model/db");

var jokeFacade = require("../model/jokeFacade");
var mongoose = require("mongoose");
var Joke = mongoose.model("Joke");
var should = require("should");
var assert = require("assert");

describe("Joke Facade", function () {

  var testJokes = [{joke: "joke1"}, {joke: "joke2"}, {joke: "joke3"}]

  beforeEach(function (done) {
    Joke.remove({}, function () {
      Joke.create(testJokes, function (err, newJokes) {
        done();
      })
    });
  });

  after(function (done) {
    //Uncomment the lines below to completely remove the test database after the tests
    if (global.TEST_DATABASE) {
      mongoose.connection.db.dropDatabase();
    }
    done();
  });

  it("should find 3 Jokes", function (done) {
    jokeFacade.allJokes(function (err, jokes) {
      if (err) throw err;
      jokes.length.should.equal(3);
      done();
    })
  });

  it("should find a random Joke", function (done) {
    jokeFacade.getRandomJoke(function (err, joke) {
      if (err) throw err;
      assert.ok(joke.joke === "joke1" || joke.joke === "joke2" || joke.joke === "joke3");
      done();
    })
  });

  it("should add a new Joke (joke4)", function (done) {
    jokeFacade.addJoke({joke: "joke4"}, function (err, newJoke) {
      if (err) throw err;
      newJoke.joke.should.equal("joke4");
      jokeFacade.allJokes(function (err, allJokes) {
        if (err) throw err;
        allJokes.length.should.equal(4);
        done();
      })
    });
  });
})
