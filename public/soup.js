console.log("soup.js loaded");

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

  function drawLocation(lat, lng, color) {
    var newCircle = L.circle([lat, lng], 100, {
      color: '#ffffff',
      fillColor: color,
      fillOpacity: 0.4,
    }).addTo(map);
  };

  function printCircleMarker(b) {
    var selectedColor;
    var lat = b.location.coordinate.latitude
    var lng = b.location.coordinate.longitude
    if (b.rating >= 4.6) { selectedColor = '#3498db'; }
    else if (b.rating >= 4.1) { selectedColor = '#1abc9c'; }
    else if (b.rating >= 3.6) { selectedColor = '#2ecc71'; }
    else if (b.rating >= 3.1) { selectedColor = '#f1c40f'; }
    else if (b.rating >= 2.6) { selectedColor = '#f39c12'; }
    else { selectedColor = '#e74c3c'; }
    drawLocation(lat, lng, selectedColor);
    L.marker([lat, lng], { title: 'Whatever' }).addTo(map).bindPopup(printPopup(b));
  };

  function printPopup(b) {
    return "<div class='location-popup'>" +
    "<h2>" + b.name + "</h2>" +
    "<p class='category'>Category: " + b.categories[0][0] + "</p>" +
    "<img class='business-photo' alt='Photograph of " + b.name + "' src='" + b.image_url + "'>" +
    "<p class='side-lat'>Latitude: " + b.location.coordinate.latitude + "</p>" +
    "<p class='side-long'>Longitude: " + b.location.coordinate.longitude + "</p>" +
    "</div>";
  }

  function determineIcon(categories) {
    if (categories[0][0]||categories[0][1] == 'Nightlife') {
      return '<img class="inv" alt="Nightlife" src="http://i.imgur.com/JnxIO7y.png" />'
    }
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
    $(".leaflet-shadow-pane").empty();
    $("g").empty();
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
        var business = response.businesses[i]
        printCircleMarker(business);
      }
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

});
