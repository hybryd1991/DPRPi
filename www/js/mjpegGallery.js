var mjpegGallery = {};

mjpegGallery.isOpen = false;
mjpegGallery.isHidden = false;

mjpegGallery.initGallery = function(){
	mjpegGallery.isOpen = false; 

	$('#footerButtons').css('bottom', -($('#footerButtons').height())-1);

	$('#subGallery').height($(window).height());
	$('#subGallery').css('top', $('#subGallery').height()-$('#showGalleryBtn').height());

};

mjpegGallery.Toggle = function(){
	if(!mjpegGallery.isOpen){
		var paneH = $('#subGallery').height();
		var surfH = $(window).height();

		$('#subGallery').animate({ top: 0 }, 300);
		$('#footerButtons').animate({bottom: 0}, 300);

		$('#showGalleryBtn > span.glyphicon').removeClass('glyphicon-chevron-up');
		$('#showGalleryBtn > span.glyphicon').addClass('glyphicon-chevron-down');

		$('.mediaContainer').css('height', $('#subGallery').height()-$('#showGalleryBtn').height()-$("#footerButtons").height());

		mjpegGallery.isOpen = true;
	}else{
		$('#subGallery').animate({ top: $('#subGallery').height()-$('#showGalleryBtn').height() }, 300);
		$('#footerButtons').animate({bottom: -($('#footerButtons').height())-1}, 300);

		$('#showGalleryBtn > span.glyphicon').removeClass('glyphicon-chevron-down');
		$('#showGalleryBtn > span.glyphicon').addClass('glyphicon-chevron-up');


		mjpegGallery.isOpen = false;
	}
};

mjpegGallery.HideToggle = function(){
	if(!mjpegGallery.isHidden){
		var btnH = $('#showGalleryBtn').height();
		$('#subGallery').animate({ top: $('#subGallery').height() }, 300);
		$('#footerButtons').css('bottom', -($('#footerButtons').height())-1);
		mjpegGallery.isHidden = true;
	}else{
		$('#subGallery').animate({ top: 0}, 300);
		$('#footerButtons').animate({bottom: 0}, 300);
		mjpegGallery.isHidden = false;
	}
};

//-------------------------------------------------------------------------------------------------------

$(document).ready(function(){

	mjpegGallery.initGallery();

	$('#showGalleryBtn').click(function(){
		mjpegGallery.Toggle();
	});

	$(window).resize(function(){
		if(!mjpegGallery.isHidden){
			mjpegGallery.initGallery();
		}else{
			mjpegGallery.isHidden = false;
			mjpegGallery.HideToggle();
		}
	});
});

