$(document).ready(function(){

	// function notify(){
	// 	console.log("you clicked");
	// }

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

});