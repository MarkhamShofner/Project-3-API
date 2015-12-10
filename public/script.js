$(document).ready(function() {

  $('#modal').on('click', function(e) {
    e.preventDefault();
  });

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


    // $('.submit').on('click', function(err) {
    // 	if (err) {
    // 		console.log("FAIL");
    // 		// $('.sidebar').append("Success");
    // 	} else {
    // 		console.log("success");
    // 	}
    // })

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
		  url: "http://localhost:3000/yelp",
			data: frontParams,
		}).done(function(response) {
		  console.log(response);
		}).fail(function(response){
		  console.log("Ajax get request failed.");
		});


  });

});
