console.log("script.js is loaded");

$(document).ready(function(){

	 $('#modal').on('click', function(e){
	 	e.preventDefault();
   });

	 $(".test").on("click", function(e){
	   e.preventDefault();
	   var location = new Location({lat: 34, long: 34})     // creates a new location object using our Location constructor
	   location.loadLocation().then(function(){   // calls .loadLocation to make the API call

			 var view = new LocationView(location) // in the promise we create a new view passing in the location object

			 // Renders location info in the sidebar
	     view.clearSidebar() // empties sidebar if one already exists
	     view.renderSidebarView() // renders the new location

			 //Adds location marker to the map
			 view.renderMarker()

	 		})
 		});



});
