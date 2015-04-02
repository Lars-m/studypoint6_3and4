var express = require('express');
var router = express.Router();


var jokeFacade = require("../model/jokeFacade");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.session.userName });
});

router.get('/joke', function(req, res, next) {
  jokeFacade.getRandomJoke(function(err,randomJoke) {
    if (err)
      return next(err);
    res.render('randomJoke', {joke: randomJoke.joke});
  })
});

router.get('/jokes', function(req, res, next) {
  jokeFacade.allJokes(function(err, allJokes){
    if(err)
      return next(err);
    res.render('allJokes', { jokes: allJokes });
  })
});

router.post('/newJoke', function(req, res, next) {
  var theJoke = req.body.joke;
  jokeFacade.addJoke({joke: theJoke},function(err,newJoke){
    if(err)
      return next(err);
    res.redirect("/addJoke");
  })

});

router.get("/login",function(req,res,next){
    res.render("loginPage",{loginerror : req.session.loginerror});
  }
)

router.get('/addJoke', function(req, res, next) {
  res.render('addJoke');
});

module.exports = router;
