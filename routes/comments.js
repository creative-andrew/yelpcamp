var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');

//Mostrar form de new comments //
router.get("/new",isLoggedIn, function (req, res){
   var id = req.params.id;
   Campground.findById(id, function(err, foundcampground){
     if (err) {
   console.log(err)
     }
         else {
    res.render('comments/new', {foundcampground: foundcampground});
         }
       })
  });


router.post("/", function(req, res) {
  Campground.findById(req.params.id, function (err, foundcampground){
        if (err) {
            console.log(err)
          
        }
   else {
  Comment.create(req.body.comment, function (err, comment){
       if (err) {
         console.log(err) }
         else {
             comment.author.id = req.user._id;
             comment.author.username = req.user.username;
             comment.save();
          foundcampground.comments.push(comment);
           foundcampground.save();
           console.log(comment);
           res.redirect('/campgrounds/'+ foundcampground._id);
         }
     });
   }
  });
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
      return next();
  };
  res.redirect('/login');
};


module.exports = router;