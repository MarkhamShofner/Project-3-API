require("./schema");
var mongoose = require("mongoose");
var conn = mongoose.connect('mongodb://localhost/locations');

// TODO - is this line needed for non-local deployment - var db = mongoose.connection;
// save for later - if splitting out seeds data generation
// var locationData = require("./location_data");

var LocationModel = require("../models/location");
LocationModel.remove({}, function(err){});

var foundersss = new LocationModel({name: "foundersss"});
var farmerss = new LocationModel({name: "farmerss"});

foundersss.save(function(err){
    if (err){
      console.log(err);
    }else {
      console.log("location was saved");
    }
  });
