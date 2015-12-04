$(document).ready(function(){

  env = require( "./env" );

  var map = L.map('map').setView([38.9047, -77.0164], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/' + PROJECT ID GOES HERE + '/{z}/{x}/{y}.png?access_token=' + API KEY GOES HERE , {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 13,
      id: PROJECT ID GOES HERE
      accessToken: API KEY GOES HERE
  }).addTo(map);

  var popup = L.popup();

  function onMapClick(e) {
    // popup
    //   .setLatLng(e.latlng)
    //   .setContent(Button message???)
    //   .openOn(map);
    var selectedColor = prompt("Pick a color");
    var newCircle = L.circle([e.latlng.lat, e.latlng.lng], 200, {
      color: '#ffffff',
      fillColor: selectedColor,
      fillOpacity: 0.25
    }).addTo(map);
  }


  map.on('click', onMapClick);
});
