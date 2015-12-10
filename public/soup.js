console.log("Welcome to our delicious jQuery soup!");

$(document).ready(function(){

  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
  //[][][][][][][][][][] Leaflet functions [][][][][][][][][][]
  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]

  var map = L.map('map').setView([38.900, -76.999], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/rebeccae.ob42lgga/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: "rebeccae.ob42lgga",
      accessToken: "pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA"
  }).addTo(map);

  var popup = L.popup();

  // printCircleMarker(38.91, -77.012);

  function drawLocation(lat, lng, color) {
    var newCircle = L.circle([lat, lng], 1000, {
      color: '#ffffff',
      fillColor: color,
      fillOpacity: 0.25,
    }).addTo(map);
  };

  function printCircleMarker(lat, lng) {
    var selectedColor = "#FF0000";
    drawLocation(lat, lng, selectedColor);
    L.marker([lat, lng]).addTo(map);
  };

  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
  //[][][][][][][][][][] Event listeners [][][][][][][][][][][]
  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]

  $('#modal').on('click', function(e){ e.preventDefault(); });

  $(".test").on("click", function(e){
    e.preventDefault();
    var location = new Location({lat: 34, long: 34})     // creates a new location object using our Location constructor
    location.loadLocation().then(function(){   // calls .loadLocation to make the API call
      var view = new LocationView(location) // in the promise we create a new view passing in the location object
      view.clearSidebar() // empties sidebar if one already exists
      view.renderSidebarView() // renders the new location
      view.renderMarker()
     })
   });

  //  $(".search").on("submit", function(e){
  //    e.preventDefault();
  //    var location = new Location()     // creates a new location object using our Location constructor
  //    location.loadLocation().then(function(){   // calls .loadLocation to make the API call
  //      var view = new LocationView(location) // in the promise we create a new view passing in the location object
  //     //  view.clearSidebar() // empties sidebar if one already exists
  //     //  view.renderSidebarView() // renders the new location
  //      view.renderMarker()
  //     })
  //   });

   //map.on('moveend', grabData());
   //map.on('load', grabData());
   //
  //  function grabData() = {
  //    e.preventDefault() // prevents a page refresh, which we don't want
  //    var bounds = map.getBounds();
  //    var long = $(".searchLong").val()
  //    var lat = $(".searchLat").val()
  //    var location = new Location({long: long, lat: lat})     // creates a new location object using our Location constructor
  //    forecast.loadLocation().then(function(){   // calls .loadLocation to make the API call
  //      view = new LocationView(location) // in the promise we create a new view passing in the location object
  //      view.renderMarker()
  //    })
  //  })

   //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
   //[][][][][][][][][][][] Location model [][][][][][][][][][]
   //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][]

   var Location = function(){
     //nada
   };

   Location.prototype.loadLocation = function(){
     var self = this
     var url = "/yelp"
     var request = $.getJSON(url).then(function(response){
       self.name = response.businesses[0].name
       self.category = response.businesses[0].categories[0][0]
       self.image_url = response.businesses[0].image_url
       self.lat = response.businesses[0].location.coordinate.latitude
       self.long = response.businesses[0].location.coordinate.longitude
     }).fail(function(response){ console.log("Failed to load JSON."); });
     return request
   }

   //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
   //[][][][][][][][][][][] Location view [][][][][][][][][][]
   //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][]

   var LocationView = function(location){
     this.location = location;
     this.$el = $(".location");
   }

   LocationView.prototype = {
     locationTemplate: function(location){
       var html = $("<div></div>");
       html.append("<h2>" + location.name + "</h2>");
       html.append("<p class='category'>Category: " + location.category + "</p>")
       html.append("<img class='business-photo' alt='Photograph of " + location.name + "' src='" + location.image_url + "'>");
       html.append("<p class='side-lat'>Latitude: " + location.lat + "</p>")
       html.append("<p class='side-long'>Longitude: " + location.long + "</p>")
       return(html);
     },
     renderSidebarView: function(){
       var self = this;
       self.$el.html(self.locationTemplate(self.location).html());
     },
     clearSidebar: function(){ this.$el.empty() },
     renderMarker: function(location){
       var self = this;
       printCircleMarker(this.location.lat, this.location.long);
     }
   }

});
