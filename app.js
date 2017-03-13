var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");


app.use(bodyParser.urlencoded({extented: true}));
app.set("view engine", 'ejs');
app.use(express.static(__dirname + "/public"));



// passport config //

app.use(require('express-session')({
  secret: 'hola mundo',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});


authRoutes       = require('./routes/index')
campgrounds       = require('./routes/campgrounds')
comments          = require('./routes/comments')
app.use('/',authRoutes);
app.use('/campgrounds',campgrounds);
app.use('/campgrounds/:id/comments', comments);


/////////////////////
// seedDB();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');



app.listen(3000, function () {
  console.log('Yelpcamp app listening on port 3000!');
});