require("./schema");
var mongoose = require("mongoose");
var conn = mongoose.connect('mongodb://localhost/locations');

// TODO - is this line needed for non-local deployment - var db = mongoose.connection;
// save for later - if splitting out seeds data generation
// var locationData = require("./location_data");

var LocationModel = require("../models/location");
LocationModel.remove({}, function(err){});

var locations = [];
var bars = [];
for(var i = 1; i < 10; i++){
  bars[i] = new LocationModel({name: "bar"+[i]});
  locations.push(bars[i]);
}

// var mcdonalds = new LocationModel({name: "mcdonalds"});
// var chipotle = new LocationModel({name: "chipotle"});

for (var i =0; i < locations.length; i++){
  locations[i].save(function(err){
    if (err){
      console.log(err);
    }else {
      console.log("location was saved");
    }
  });
}
