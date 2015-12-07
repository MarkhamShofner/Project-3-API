
$(document).ready(function(){

  var map = L.map('map').setView([38.9047, -77.0164], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/rebeccae.ob42lgga/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: "rebeccae.ob42lgga",
      accessToken: "pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA"
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
