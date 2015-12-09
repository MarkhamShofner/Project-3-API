var Location = function(info){
  this.name = info.name;
  this.lat = info.lat;
  this.long = info.long;
  this.type = info.type;
  this.score = info.score;
  this.id = info.id;
};

// Location.all = [];
// Location.fetch = function(){
//   var url = "/locations";
//   var request = $.getJSON(url).then(function(response){
//     for(var i = 0; i < response.length; i++){
//       Location.all.push(new Location(response[i]));
//     }
//   }).fail(function(response){
//     console.log("js failed to load");
//   });
//   return request;
// };


Location.prototype.loadLocation = function(){
  var self = this
  var
  var url = "/yelp"
  var request = $.getJSON(url)
  .then(function(response){

    // --------- Andy's Blog Post Sample Code ------------

    // self.tempF = response.current_observation.temp_f
    // self.iconUrl = response.current_observation.icon_url
    // self.description = response.current_observation.weather

    // --------- Just pulling from first result ------------

    self.name = response.businesses[0].name
    self.category = response.businesses[0].categories[0][0]
    self.image_url = response.businesses[0].image_url

    // --- Eventually: Loop over responses and return an array of hashes? -----

    // for(var i = 0; i < response.businesses.length; i++){
    //
    //   var self = this
    //   self.
    //
    // }

  }).fail(function(response){
    console.log("Failed to load JSON.");
  });
  return request;
};
