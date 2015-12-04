var Location = function(info){
  this.name = info.name;
  this.lat = info.lat;
  this.long = info.long;
  this.type = info.type;
  this.score = info.score;
  this.id = info.id;
};

Location.all = [];
Location.fetch = function(){
  var url = "/locations";
  var request = $.getJSON(url).then(function(response){
    for(var i = 0; i < response.length; i++){
      Location.all.push(new Location(response[i]));
    }
  }).fail(function(response){
    console.log("js failed to load");
  });
  return request;
};

// do we need this?????
module.exports = Location;
