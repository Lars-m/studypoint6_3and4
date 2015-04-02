global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";

require("../model/db");

var userFacade = require("../model/userFacade");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var should = require("should");

describe("User Facade", function () {

  var testUsers = [{userName: "userA", password: "pwA"}, {userName: "userB", password: "pwB"}, {
    userName: "userC",
    password: "pwC"
  }]

  beforeEach(function (done) {
    User.create(testUsers, function (err, newUser) {
      done();
    })
  });

  after(function (done) {
    //Uncomment the line below to completely remove the test database after the tests
    if (global.TEST_DATABASE) {
      mongoose.connection.db.dropDatabase();
    }
    done();
  });

  it("should authenticate userA", function (done) {
    userFacade.checkUser("userA", "pwA", function (err, result) {
      if (err) throw err;
      result.should.equal(true);
      done();
    })
  });

  it("should NOT authenticate userA (wrong Password)", function (done) {
    userFacade.checkUser("userA", "pw-wrong", function (err, result) {
      if (err) throw err;
      result.should.equal(false);
      done();
    })
  });

  it("should NOT authenticate userX (Non existing user)", function (done) {
    userFacade.checkUser("userX", "pw", function (err, result) {
      if (err) throw err;
      result.should.equal(false);
      done();
    })
  });

  it("should add a new user (verified via a checkUser-check)",function(done){
    userFacade.addUser("userNew","pwNew",function(err,newUser){
      if(err) throw err;
      newUser.userName.should.equal("userNew");
      userFacade.checkUser("userNew","pwNew",function(err,result){
        if(err) throw err;
        result.should.equal(true);
        done();
      })
    })
  })


})
