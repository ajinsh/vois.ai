$(function(){

	$('#an_btn').click(function(){

		$.ajax({
			url: '/vois.ai/analyze/',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});
