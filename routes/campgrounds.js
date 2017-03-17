var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds');





router.get('/', function (req, res) {
  
 Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    }

    else {
        res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
    }
});
     
        });


router.post('/',isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username};
 var newcampground = {name: name, image: image, description: description, author: author};
 Campground.create(newcampground, function (err, newcampground) {
       if(err) {
         console.log(err)
       }
       else {

  res.redirect('/campgrounds');
       }
 })
});

router.get('/new',isLoggedIn, function (req, res) {
       res.render('campgrounds/new');
        });


router.get('/:id', function (req, res){
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, foundcampground){
    if (err) {
      console.log(err)
    }
    else {
  res.render('campgrounds/show', {foundcampground: foundcampground});
    }
  });
});


// EDIT 
router.get("/:id/edit",mirarAutorizacion, function(req, res){
  Campground.findById(req.params.id, function(err,foundcampground) {
        if (err) {
          console.log(err)
        }
        else {
          res.render('campgrounds/edit', {campground: foundcampground});
        }
  });

});

/////
router.put("/:id",mirarAutorizacion, function(req, res ){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var data = {name: name, image: image, description: description};

Campground.findByIdAndUpdate(req.params.id, data, function(err,updatedCampground ){
      if (err){
        console.log(err)
      }
      else {
        res.redirect('/campgrounds/' + req.params.id)
      }
})
});
/// destroy route //

router.delete('/:id',mirarAutorizacion, function (req, res){
Campground.findByIdAndRemove(req.params.id, function(err){
      if (err) {
        console.log(err)
      }
      else {
        res.redirect('/campgrounds');
      }
});
});

function mirarAutorizacion(req, res, next) {
  if (req.isAuthenticated()) {
      Campground.findById(req.params.id, function(err, foundcampground){
          if (err) {
            console.log(err)
          }
          else {
           if (foundcampground.author.id.equals(req.user._id)){
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

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
      return next();
  };
  res.redirect('/login');
};


module.exports = router;