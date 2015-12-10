console.log("jQuery soup--the flavorful treat that's fun to eat!");

$(document).ready(function(){

  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]
  //[][][][][][][][][][] Leaflet functions [][][][][][][][][][]
  //[][][][][][][][][][][][][][][][][][][]][][][][][][][][][][]

    $('#openLogin').on('click', function(){
      $("#signupPopup").hide();
      $("#loginPopup").show();
      $("#openLogin").addClass('selected');
      $("#openSignup").removeClass('selected');
    }); 

    $('#openSignup').on('click', function(){
      $("#loginPopup").hide();
      $("#signupPopup").show();
      $("#openSignup").addClass('selected');
      $("#openLogin").removeClass('selected');
    }); 

    $('.close').on('click', function(e){
      e.preventDefault();
      $('.authPopup').hide();
    });

  var map = L.map('map').setView([38.900, -76.999], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/rebeccae.ob42lgga/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: "rebeccae.ob42lgga",
      accessToken: "pk.eyJ1IjoicmViZWNjYWUiLCJhIjoiY2locW50eDhwMDRxaXRnbTQ4NGZqM3F4ZiJ9.bdeGen8FhiVQqFbI7Vz0lA"
  }).addTo(map);

  var popup = L.popup();

  // printCircleMarker(38.91, -77.012);

  function drawLocation(lat, lng, opac) {
    var newCircle = L.circle([lat, lng], 300, {
      color: '#ffffff',
      fillColor: '#ff0000',
      fillOpacity: opac,
    }).addTo(map);
  };

  function printCircleMarker(lat, lng, rating) {
    var selectedColor = rating / 10
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

  $('#passParams').on('click', function(e) {
    e.preventDefault();
    var frontParams = {};
    frontParams.latitude = $(".searchLatitude").val();
    frontParams.longitude = $(".searchLongitude").val();
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
