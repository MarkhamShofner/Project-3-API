$(document).ready(function() {

  // function notify(){
  // 	console.log("you clicked");
  // }

  $('#modal').on('click', function(e) {
    e.preventDefault();
  });

  $('#passParams').on('click', function(e) {
    e.preventDefault();
    // console.log($(".searchLatitude").val());
    // console.log($(".searchLongitude").val());
    // console.log($(".searchType").val());
    var frontParams = {};
    frontParams.latitude = $(".searchLatitude").val();
    frontParams.longitude = $(".searchLongitude").val();
    frontParams.term = $(".searchType").val();
		console.log(frontParams);
			


  });



});
