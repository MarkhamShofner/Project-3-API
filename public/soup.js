console.log("soup.js loaded");

$(document).ready(function(){

  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
  //[][][][][][][][][][][][] Overlay [][][][][][][][][][][][][]
  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]

  window.setTimeout(function(){
       $(".overlay").fadeOut("7000", function(){});
   }, 3000);

  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
  //[][][][][][][][][][] Leaflet functions [][][][][][][][][][]
  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]

  var map = L.map('map').setView([38.900, -76.999], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/rebeccae.ob42lgga/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: "rebeccae.ob42lgga",
      accessToken: "pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA"
  }).addTo(map);

  map.locate({ setView: true, enableHighAccuracy: true }).on('locationfound', function(e){
    console.log( "Location detected. Lat: " + e.latitude + ", Long: " + e.longitude );
    map.panTo([e.latitude, e.longitude], {animate: true, duration: 5.0});
  }).on('locationerror', function(e){
    console.log("Location not detected.");
  });

  var popup = L.popup();

  function drawLocation(lat, lng, color) {
    var newCircle = L.circle([lat, lng], 60, {
      color: '#ffffff',
      fillColor: color,
      fillOpacity: 0.2,
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
    L.marker([lat, lng], { title: 'Whatever' })
      .addTo(map).bindPopup(printPopup(b))
      .on('mouseover',function(e){this.openPopup();}
    );
  };

  function printPopup(b) {
    return "<div class='location-popup'>" +
    "<a href='" + b.url + "'><h1 class='biz-name'>" + b.name + "</h1></a>" +
    "<h3 class='biz-category'>" + b.categories[0][0] + "</h2>" +
    "<p class='biz-address'>" + b.location.address + ", " + b.location.city + ", " + b.location.state_code + "</p>" +
    "<img class='business-photo' alt='Photograph of " + b.name + "' src='" + b.image_url + "'>" +
    "</div>";
  }

  // function determineIcon(categories) {
  //   if (categories[0][0]||categories[0][1] == 'Nightlife') {
  //     return '<img class="inv" alt="Nightlife" src="http://i.imgur.com/JnxIO7y.png" />'
  //   }
  // };

  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
  //[][][][][][][][][][] Event listeners [][][][][][][][][][][]
  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]

  $('#modal').on('click', function(e){ e.preventDefault(); });

  map.on('load', function(){
    setTimeout(map.zoomIn(1), 1000);
  });

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

});
