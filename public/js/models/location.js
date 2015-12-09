var Location = function(info){
  this.name = info.name;
  this.category = info.category;
  this.image_url = info.image_url;
};

Location.prototype.loadLocation = function(){
  var self = this
  
  //  info passes through a map bounds object, which will return this:
  //
  //  bounds.LatLngBounds
  //    _northEast: o.LatLng
  //        lat: 42.0468718
  //        lng: 2.7438793000000032
  //    _southWest: o.LatLng
  //        lat: 41.219172
  //        lng: 1.6023217
  //
  // now we have to parse these things into something

  var url = "/yelp"
  var request = $.getJSON(url)
  .then(function(response){

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
