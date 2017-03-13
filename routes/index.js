var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require("passport");
var LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.get('/', function(req, res){
    res.render('landing');
});


// AUTH ROUTES //

router.get("/register", function(req, res){
res.render('register');
});


////////////////////////////////////
router.post("/register", function(req, res){

var newUser = new User({username: req.body.username});

User.register(newUser, req.body.password, function(err, user){
  if (err) {
    console.log (err)
  }
  else {
    console.log(user)
    passport.authenticate("local")(req, res, function() {
    res.redirect('/campgrounds');
    
  })}
});

});

// show login form //

router.get('/login',function(req, res) {
   res.render('login'); 
});

router.post('/login',passport.authenticate("local",
 {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"}
   
) ,function(req, res){

});


function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
      return next();
  };
  res.redirect('/login');
};

router.get("/logout", function(req, res) {

  req.logOut();
  res.redirect('/campgrounds');
});


module.exports = router;