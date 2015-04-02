var mongoose = require( 'mongoose' );

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  dbURI = 'mongodb://localhost/jokes';
}

var Schema = mongoose.Schema;
mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

//Schemas

var userSchema = new Schema({
  userName: {type: String, unique : true},
  password : String
});

var jokeSchema = new Schema({
  joke : String
});


mongoose.model("User",userSchema);
mongoose.model("Joke",jokeSchema);

