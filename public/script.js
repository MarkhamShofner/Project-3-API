$(document).ready(function() {

  $('#modal').on('click', function(e) {
    e.preventDefault();
  });

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
		  url: "http://localhost:3000/yelp",
			data: frontParams,
		}).done(function(response) {
		  console.log(response);
		}).fail(function(response){
		  console.log("Ajax get request failed.");
		});

  });

});
