$(document).ready(function(){

	// function notify(){
	// 	console.log("you clicked");
	// }

	$('#openLogin').on('click', function(e){
		$("#signupPopup").hide();
		$("#loginPopup").show();
		$("#openLogin").addClass('selected');
		$("#openSignup").removeClass('selected');

    }); 

    $('#openSignup').on('click', function(e){
		$("#loginPopup").hide();
		$("#signupPopup").show();
		$("#openSignup").addClass('selected');
		$("#openLogin").removeClass('selected');

    }); 

});