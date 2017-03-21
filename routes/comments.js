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

router.get("/:comment_id/edit",mirarAutorizacion2, function (req, res){
var campground_id = req.params.id;
     Comment.findById(req.params.comment_id, function(err,comment) {
        if (err) {
          console.log(err)
        }
        else {
          res.render('comments/edit', {campground_id: campground_id, comment: comment });
        }
  });
   
}); 


router.post("/:comment_id",mirarAutorizacion2, function (req, res) {
Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
  if (err) {
    console.log(err)
  }
  else {
    console.log(updatedComment)
    res.redirect("/campgrounds/"+req.params.id)
  }
})

});


router.delete('/:comment_id',mirarAutorizacion2, function (req, res){
Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if (err) {
        console.log(err)
      }
      else {
        res.redirect('/campgrounds/'+req.params.id);
      }
});
});




function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
      return next();
  };
  res.redirect('/login');
};

function mirarAutorizacion2(req, res, next) {
  if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, comment){
          if (err) {
            console.log(err)
          }
          else {
           if (comment.author.id.equals(req.user._id)){
                next();
          }
          else {
            res.redirect('back');
          }
           };
      });
  }
  else {
    res.redirect('back');
  }
};



module.exports = router;