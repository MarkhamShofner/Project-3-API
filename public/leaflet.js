
$(document).ready(function(){

  var map = L.map('map').setView([38.900, -76.999], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/rebeccae.ob42lgga/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: "rebeccae.ob42lgga",
      accessToken: "pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA"
  }).addTo(map);

  var popup = L.popup();

  printCircleMarker(38.91, -77.012);
  printCircleMarker(38.895, -77.023);
  printCircleMarker(38.913, -77.035);
  printCircleMarker(38.921, -77.018);
  printCircleMarker(38.894, -77.038);
  printCircleMarker(38.91, -77.032);
  printCircleMarker(38.89, -76.98);

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
    // saveLocation(e.latlng.lat, e.latlng.lng, selectedColor);
  };

  function saveLocation(e) {
    // post this to an API.
  }

  function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
  }

  // map.on('click', onMapClick);

  // map.on('moveend', function() {
  //   e.preventDefault() // prevents a page refresh, which we don't want
  //   // var bounds = map.getBounds(); // grabs and stores the Leaflet map boundaries
  //   var long = $(".searchLong").val()
  //   var lat = $(".searchLat").val()
  //   location = new Location({long: long, lat: lat})     // creates a new location object using our Location constructor
  //   forecast.loadLocation().then(function(){   // calls .loadLocation to make the API call
  //     view = new LocationView(location) // in the promise we create a new view passing in the location object
  //     view.clearContainer() // empties location if one already exists
  //     view.render() // renders the new location
  //   })
  // })

   $(".search").on("submit", function(e){
     e.preventDefault(); // prevents a page refresh, which we don't want
     // var bounds = map.getBounds(); // grabs and stores the Leaflet map boundaries
     var long = $(".searchLong").val()
     var lat = $(".searchLat").val()
     location = new Location({long: long, lat: lat})     // creates a new location object using our Location constructor
     location.loadLocation().then(function(){   // calls .loadLocation to make the API call
       view = new LocationView(location) // in the promise we create a new view passing in the location object
       view.clearContainer() // empties location if one already exists
       view.render() // renders the new location
     })
   });

  //  $(".test").on("click", function(e){
  //    e.preventDefault();
  //    location = new Location({long: "nothing", lat: "nothing"})     // creates a new location object using our Location constructor
  //    location.loadLocation().then(function(){   // calls .loadLocation to make the API call
  //      view = new LocationView(location) // in the promise we create a new view passing in the location object
  //      view.clearContainer() // empties location if one already exists
  //      view.render() // renders the new location
  //  });


});
