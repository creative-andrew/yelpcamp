var mongoose = require('mongoose');
var Campground = require("./models/campgrounds")
var Comment = require("./models/comment")

var data = [
		{name: "Camp 1",
		 image: 'https://secure.passport-america.com/campgrounds/images/855_1.png',
		 description: 'LOL'
		},
		{name: "Camp 2",
		 image: 'https://secure.passport-america.com/campgrounds/images/855_1.png',
		 description: 'LOL'
		},
		{name: "Camp 3",
		 image: 'https://secure.passport-america.com/campgrounds/images/855_1.png',
		 description: 'LOL'
		}
]



function seedDB () {
	// remove all campgrounds
Campground.remove({}, function (err){
	if (err) {
      console.log(err)
	}
else {
	console.log("borrado");
	data.forEach(function(seed){
   Campground.create(seed, function(err, campground){
   	if (err){
   		console.log(err)
   	}
   	else {
   		console.log('agregando');
   		Comment.create(
   			{text: "Cool place", 
   			author: "Homer"}, function(err, comment){
   				if (err) {
   					console.log(err)
   				}
   				else {
   					campground.comments.push(comment);
   					campground.save();
   					console.log("Create new comment");
   				}
                       

   			});
   	};
   });
});
}

});


};


module.exports = seedDB;
