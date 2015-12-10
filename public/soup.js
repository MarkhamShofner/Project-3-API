console.log("jQuery soup--the flavorful treat that's fun to eat!");

// var bounds;

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
    var newCircle = L.circle([lat, lng], 300, {
      color: '#ffffff',
      fillColor: color,
      fillOpacity: 0.4,
    }).addTo(map);
  };

  function printCircleMarker(lat, lng, rating) {
    var selectedColor;
    if (rating >= 4.6) { selectedColor = '#3498db'; }
    else if (rating >= 4.1) { selectedColor = '#1abc9c'; }
    else if (rating >= 3.6) { selectedColor = '#2ecc71'; }
    else if (rating >= 3.1) { selectedColor = '#f1c40f'; }
    else if (rating >= 2.6) { selectedColor = '#f39c12'; }
    else { selectedColor = '#e74c3c'; }
    drawLocation(lat, lng, selectedColor);
    L.marker([lat, lng]).addTo(map);
  };

  function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

  function distanceMeasurement(yelpResponse) {
    var responseArray = yelpResponse.businesses;
    var center = yelpResponse.region.center;
    var centerLat = center.latitude;
    var centerLong = center.longitude;
    var distanceSum = 0;
    for (var i = 0; i<responseArray.length; i++){
      var bizLat = responseArray[i].location.coordinate.latitude;
      var bizLong = responseArray[i].location.coordinate.longitude;
      var distance = measure (bizLat, bizLong, centerLat, centerLong);
      distanceSum = distanceSum + distance;
    }
    distanceAvg = distanceSum / responseArray.length;
    $(".averagedistance").text(distanceAvg + " meters");
    $(".totaldistance").text(distanceSum + " meters");
  }

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

  //  $(".test").on("click", function(){ grabData(event, 'click') });
  // //  $(".search").on('submit', grabData(e, 'search'));
  // //  map.on('moveend', grabData(e, 'moveend'));
  // //  map.on('load', grabData(e, 'load'));
  //
  //  function grabData(e, action) {
  //    e.preventDefault() // prevents a page refresh, which we don't want
  //    var location = new Location(action)     // creates a new location object using our Location constructor
  //    location.loadLocation().then(function(){   // calls .loadLocation to make the API call
  //      view = new LocationView(location) // in the promise we create a new view passing in the location object
  //      view.clearSidebar() // empties sidebar if one already exists
  //      view.renderSidebarView() // renders the new location
  //      view.renderMarker()
  //    })
  //  }

  map.on('moveend', function() {
    $(".leaflet-marker-pane").empty();
    // $(".leaflet-overlay-pane").empty();
    var frontParams = {};
    var bounds = map.getBounds();
    frontParams.sw_lat = bounds._southWest.lat;
    frontParams.sw_long = bounds._southWest.lng;
    frontParams.ne_lat = bounds._northEast.lat;
    frontParams.ne_long = bounds._northEast.lng;
    frontParams.term = $(".searchType").val();
    console.log(frontParams);
    $.ajax({
      type: 'POST',
      dataType: 'json',
      // TODO - make this link non-localable (for deployment)
      url: "/yelp",
      data: frontParams,
    }).done(function(response) {
      console.log(response);
      for (var i = 0; i < response.businesses.length; i++) {
        var biz = response.businesses[i]
        printCircleMarker(
          biz.location.coordinate.latitude,
          biz.location.coordinate.longitude,
          biz.rating
        );
      }
      distanceMeasurement(response);
    }).fail(function(response){
      console.log("Ajax post request failed.");
    });
  });

   //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
   //[][][][][][][][][][][] Location model [][][][][][][][][][]
   //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][]

   var Location = function(a){
     var action = a
     console.log("Location instantiated of type " + a);
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
