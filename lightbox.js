// lightbox animation
// // // //  // // // // // // // 
// create the overlay
var $overlay = $('<div id="overlay" class="overlay"></div>');
var $background = $('<div class="background"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $arrow_right = $('<i>&rarr;</i>');
var $arrow_left = $('<i>&larr;</i>');

$overlay.append($background);
$overlay.append($arrow_left);
$overlay.append($image);
$overlay.append($arrow_right);
$overlay.append($caption);

// Add overlay and hide it
$('body').append($overlay);
$($overlay).hide();

//create an array of all the images
var images = $('.lightbox a');
//find the length of the array
var images_count = images.length;
//keep the location of the current image being displayed
var $current_image;

//function to be used to show the lightbox with an image
var lightboxShow = function(picID){
	// grab the url of the corresponding full size img from its <a> tag in the images array
	var imageLocation = $('.lightbox a').eq(picID).attr('href');
	// update the overlay with the selected image 
	$image.attr("src", imageLocation);  
	// get child alt attribute and add as caption
	var captionText = $('.lightbox a').eq(picID).children("img").attr("alt");
	$caption.text(captionText);
	// show the overlay
	$overlay.show();
}

//loading function that adjusts the image to fit on the page
$('#overlay img').load(function(){
	// select the img and set it to a variable
	var $overlayImg = $('#overlay img');

	// create an offscreen version to obtain the actual dimensions
	var imgNormal = new Image();
	imgNormal.src = $overlayImg.attr("src");

	// check the height and width of the image
	var $image_height = imgNormal.height;
	var $image_width = imgNormal.width;
	var $image_ratio = $image_height / $image_width;

	// check the height and width of the display
	var $display_height = $(window).height();
	var $display_width = $(window).width();
	var $display_ratio = $display_height / $display_width;

	// adjust the image to fit a display that is either tall or wide
	if($image_ratio > $display_ratio){
		$overlayImg.height('80%');
		$overlayImg.width('auto');
	} else {
		$overlayImg.width('80%');
		$overlayImg.height('auto');
	}
});

// after clicking an image, run lightbox_show function for the selected image
$('.lightbox a').click(function(event){
	//prevent the default operation
	event.preventDefault(event);
	// find the position of the clicked image in the images array
	$current_image = jQuery.inArray(this, images);
	//show the image
	lightboxShow($current_image);
});

// right and left arrows for navigation
$arrow_right.click(function(){
	// check if we're at the end of the array or simply move to the next slide
	if($current_image < images_count-1){
		$current_image = (Number($current_image) + 1);
	} else{
		$current_image = 0;
	}
	lightboxShow($current_image);
});
$arrow_left.click(function(){
	// check if we're at the beginning of the array or simply move to the previous slide
	if($current_image >= 0){
		$current_image = (Number($current_image) - 1);
	} else{
		$current_image = images_count-2;
	}
	lightboxShow($current_image);
});

// Hide overlay
$(document).keydown(function(a){
	// hide the overlay when the escape key is pressed
	if (a.keyCode == 27){
		$overlay.hide();
	}
});
$(window).resize(function(){
	//hide the overlay if the window is resized
	$overlay.hide();
});
$('.background').click(function(){
	//hide the overlay if a user clicks outside the overlay image or navigation arrows
	$overlay.hide();
});