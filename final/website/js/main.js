$(document).ready(function() {
	var topPixels = 0;
	var botPixels = 0;
	var moveTop = 0;
	var first = 0;
	var botStart = 0;
	var index = 0;
	var numRows = 0;
	var topRows = 0;
	var viewportHeight = $(window).height() - 50;
	var searchHeight = 0;
	var viewportWidth = $(window).width();
	$("#about").css("right", viewportWidth);
	$("#about-toggle").click(function() {
		$("#about").velocity({right: 0}, {duration: 600});
		if($(".about-view").length == 0){
			$("#about").toggleClass("about-view");
		}
		$(".back").velocity("transition.slideLeftIn", {delay: 500, duration: 400});
	});
	var info ="<div id='info'></div>";
	var description = "<div class='description'>We have a lot of good craft beer, and a bunch of specialty drinks!</div>";
	var specials = "<div class='title'>Today's Specials</div><ul><li>$1 Off Mixed Drinks</li><li>50% Off Appetizers</li><li>$2 Domestic Beers</li></ul>";
	var happyHour = "<div class='title'>Happy Hour: <span class='time'>2PM - 7PM</span></div><ul><li>Half Off Well Drinks</li><li>$3 Pints of Guinness</li></ul>";
	var hours = "<div class='title'>Hours: <span class='time'>11AM - 2AM</span></div>";
	var info = $("<div id='info' class='info'></div>").append(description).append(specials).append(happyHour).append(hours);

	$("#search-btn").click(function() {
		searchHeight = $(".search-container").height();

		$('.search-container').velocity({
			translateY: -searchHeight
		}, 700);
		$('.list').velocity({
			translateY: -searchHeight
		}, 700);
		$(".back").velocity("transition.slideLeftIn", {delay: 500, duration: 400});
		$(".back").toggleClass("start");
		$(".list-title").velocity("transition.slideLeftIn", {drag: true, stagger: 100, delay: 500, duration: 300});
		$(".bar").velocity("transition.slideUpIn", { stagger: 100, delay: 500});
		$(".nav-bottom").velocity("transition.bounceUpIn", {delay: 600});

	});

	$(".back").click(function() {
		if ($(".back2").length == 0 && $(".about-view").length == 0){
			$(".nav-bottom").velocity("transition.slideDownOut", {duration: 200});
			$(".back").velocity("transition.slideLeftOut", { duration: 400});
			$(".list-title").velocity("transition.slideLeftOut", { delay: 100, duration: 300});
			$(".bar").velocity("transition.slideLeftOut", { drag: true, duration: 300});
			$('.list').velocity({
				translateY: searchHeight
			}, {duration: 700, delay: 550});
			$('.search-container').velocity({
				translateY: 0
			},{duration: 700, delay: 550});
			$(".back").toggleClass("start");
		} 
		if ($(".about-view").length == 1) {
			$("#about").velocity({right: viewportWidth}, {duration: 600});
			setTimeout(function() {
				$("#about").toggleClass("about-view");
			}, 300);
			if($(".back2").length == 0 && $(".start").length == 1){
				$(".back").velocity("transition.slideLeftOut", { duration: 400});
			}
		
		} 
		if ($(".back2").length == 1 && $(".about-view").length == 0) {
			$("#info").velocity("transition.slideLeftOut", {duration: 500, drag: true});
			$(".bar").slice(index, index+1).velocity({ height: 50 }, {duration: 300, delay: 500});
			$(".list-title").velocity("transition.slideLeftIn", {duration: 100, delay: 550});
			setTimeout(function() {

				$(".bar").slice(index, index+1).velocity({
				translateY: 0
				}, {duration: 300});
		
				$(".bar").slice(botStart, numRows).velocity({ 
				translateZ: 0,
				translateY: 0 
				}, 700);
		
				$(".bar").slice(first, index).velocity({ 
				translateZ: 0,
				translateY: 0 
				}, 700);
				$(".back").toggleClass("back2");
				$(".list").css("overflow-y", "auto");
			}, 600);
		}
	});

	$(".help").click(function() {
		if( $(".help-list").css('opacity') == 0 ) {
			$(".help-list").velocity("transition.bounceIn", {duration: 300});
		} else {
			$(".help-list").velocity("transition.bounceOut", {duration: 300});
		}
	});

	$("body").on("click", "div.bar", function() {
		if( $(".back2").length == 0){
			$(".back").toggleClass("back2");
		}
		$(".list").css("overflow-y", "hidden");
		$(".list-title").velocity("transition.slideLeftOut", {duration: 100, delay: 300});
		index = $(".bar").index(this);
		numRows = $('.bar').length;
		
		//alert("Index: "+index+", topRows: "+first);
		//50 is height of bar div
		topPixels = index * 50;

		$(".bar").slice(first, index).velocity({ 
		translateZ: 0,
		translateY: -topPixels 
		}, 700);

		botStart = index +1;
		var botRows = numRows - index;
		botPixels = botRows * 50 + viewportHeight;
		
		//Moves the bottom rows away
		$(".bar").slice(botStart, numRows).velocity({ 
		translateZ: 0,
		translateY: botPixels 
		}, 900);

		//move the selected row
		$(".bar").slice(index, index+1).velocity({
			translateY: -topPixels
		}, {duration: 500, delay: 500});
		$(".bar").slice(index, index+1).velocity({ height: viewportHeight - 50 }, {duration: 500, delay: 600});
		setTimeout(function() {
			$(".bar").slice(index, index+1).append(info);
			$("#info").velocity("transition.slideLeftIn", {delay: 200, duration: 400});
		}, 1100);
	});

});