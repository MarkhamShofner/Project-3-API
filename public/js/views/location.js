console.log("/js/views/location.js is loaded");

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
    html.append("<p class='category'>Latitude: " + location.lat + "</p>")
    html.append("<p class='category'>Longitude: " + location.long + "</p>")
    return(html);
  },

  renderSidebarView: function(){
    var self = this;
    self.$el.html(self.locationTemplate(self.location).html());
  },

  clearSidebar: function(){
    this.$el.empty()
  },

  renderMarker: function(){
    // L.marker([location.lat, location.lng]).addTo(map);
    addMarker(location.lat, location.lng);
  }

}
