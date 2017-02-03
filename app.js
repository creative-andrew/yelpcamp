var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extented: true}));


app.set("view engine", 'ejs');


app.get('/', function (req, res) {
       res.render('landing');
        });
var campgrounds = [
         {name: 'Camp 1', image: 'http://www.photosforclass.com/download/7626464792'},
         {name: 'Camp 2', image: 'http://www.photosforclass.com/download/7626464792'},
          {name: 'Camp 3', image: 'http://www.photosforclass.com/download/7626464792'},
          {name: 'Camp 4', image: 'http://www.photosforclass.com/download/7626464792'}
]
app.get('/campgrounds', function (req, res) {
  
       res.render('campgrounds', {campgrounds: campgrounds});
        });

app.post('/campgrounds', function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  campgrounds.push({name: name, image: image});
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function (req, res) {
       res.render('new');
        });


app.listen(3000, function () {
  console.log('Yelpcamp app listening on port 3000!');
});