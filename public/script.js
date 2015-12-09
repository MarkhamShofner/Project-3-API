console.log("script.js is loaded");

$(document).ready(function(){

	// function notify(){
	// 	console.log("you clicked");
	// }

	$('#modal').on('click', function(e){
		e.preventDefault();
	});

	 $(".test").on("click", function(e){
	   e.preventDefault();
		 console.log("location = " + location);
	   var location = new Location({lat: 34, long: 34})     // creates a new location object using our Location constructor
	   location.loadLocation().then(function(){   // calls .loadLocation to make the API call
	     view = new LocationView(location) // in the promise we create a new view passing in the location object
	     view.clearContainer() // empties location if one already exists
	     view.render() // renders the new location
	 		})
 		});



});
