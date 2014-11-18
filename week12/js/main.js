$(document).ready(function() {
	$("#ryu").html('<img src="imgs/ryu_stand.png">')

	$('#ryu img').hover( function() {
		this.src = "imgs/ryu_moving.gif"
	}, function() {
		this.src = "imgs/ryu_stand.png"
	})

	$('#ryu img').mousedown( function() {
    	this.src = 'imgs/ryu_hadouken.png' 
	})
	$('#ryu img').mousedown(function() {
	    $('.demo-hadouken').remove();
	})
	$("#ryu img").mousedown(function () {
		$("#ryu").append(
			'<img class="demo-hadouken" src="imgs/hadouken.gif">'
		);
	})
	$('#ryu img').mousedown(function() {
	    $('.demo-hadouken').animate( {
	        "margin-left": "600px"
	    }, 1000, 'swing', function() {
	        this.remove();
	    })
	})
	$('#ryu img').mouseup(function() {
	    this.src = 'imgs/ryu_stand.png'
	})

});