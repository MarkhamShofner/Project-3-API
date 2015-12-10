//seeds.js

require("./schema");
var mongoose = require("mongoose");

//[][][][][][][][][]>>> Variable Declarations <<<[][][][][][][][][]//

var locations = [];
var bars = [];
var adj = [ "Prancing", "Smelly", "Stinky", "Insolent", "Furious", "Happy", "Frolicking", "Drunken" ];
var noun = [ "Crab", "Elephant", "Giraffe", "Pirate", "Sailor", "Warthog", "Jester", "Stag", "Knight" ];
var types = [ "Dive bar", "Saloon", "Nightclub", "Irish bar", "Rave warehouse", "English pub", "Brewery" ];

// TODO - is this line needed for non-local deployment - var db = mongoose.connection;
// save for later - if splitting out seeds data generation
// var locationData = require("./location_data");

var LocationModel = require("../models/location");
LocationModel.remove({}, function(err){});

//[][][][][][][][][]>>> Randomizer Functions <<<[][][][][][][][][]//

// Chooses random item from array
function rand(array){
  return array[Math.floor(Math.random()*array.length)];
}

//Chooses random number from given range
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

//Chooses random Integer from given range
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//[][][][][][][][][]>>> Seeding Functions <<<[][][][][][][][][]//

for(var i = 1; i < 15; i++){
  bars[i] = new LocationModel({
    name: "The " + rand(adj) + " " + rand(noun),
    lat: randNum(38.85, 38.93),
    long: randNum(-77.10, -76.97),
    type: rand(types),
    score: randInt(0, 10)
  });
  locations.push(bars[i])
  // console.log(bars[i].name + " is a " + bars[i].type + " with score " + bars[i].score);
}

for (var i =0; i < locations.length; i++){
  locations[i].save(function(err){
    if (err){
      console.log(err);
    } else {
      console.log( "Location " + locations[i] + " saved." );
    }
  });
}
