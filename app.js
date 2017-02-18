var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");
app.use(bodyParser.urlencoded({extented: true}));

app.set("view engine", 'ejs');


seedDB();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');


app.get('/', function (req, res) {
       res.render('landing');
        });


app.get('/campgrounds', function (req, res) {
  
 Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    }

    else {
        res.render('campgrounds', {campgrounds: campgrounds});
    }
});
     
        });


app.post('/campgrounds', function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
 var newcampground = {name: name, image: image, description: description};
 Campground.create(newcampground, function (err, newcampground) {
       if(err) {
         console.log(err)
       }
       else {
  res.redirect('/campgrounds');
       }
 })
});

app.get('/campgrounds/new', function (req, res) {
       res.render('new');
        });


app.get('/show/:id', function (req, res){
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, foundcampground){
    if (err) {
      console.log(err)
    }
    else {
      console.log(foundcampground);
  res.render('show', {foundcampground: foundcampground});
    }
  });
});





app.listen(3000, function () {
  console.log('Yelpcamp app listening on port 3000!');
});