var mjpegPlayer = {};

mjpegPlayer.mjpegW = 0;
mjpegPlayer.mjpegH = 0;
mjpegPlayer.IP = '';

mjpegPlayer.isVideoPlayer = false;
mjpegPlayer.isPhotoPlayer = false;

mjpegPlayer.isVideoContHidden = false;
mjpegPlayer.isPhotoContHidden = false;

/*mjpegPlayer.Start = function(ip){
	this.IP = ip;
	this.initPlayer();
	setInterval(this.compareSizes, 1000);
};

mjpegPlayer.initPlayer = function(){
	$.ajax({
	  	url: 'modules/getMjpegSize.php',
	  	dataType: 'json',
	  	success: function(data){

	    	//ширина, высота и пропорции контейнера
	    	var surfSizes
	    	if(mjpegPlayer.isVideoPlayer){
	    		surfSizes = mjpegPlayer.getVideoPlayerPosition();
	    	}else if(mjpegPlayer.isPhotoPlayer){
	    		surfSizes = mjpegPlayer.getPhotoPlayerPosition();
	    	}else{
  				surfSizes = mjpegPlayer.getCapturePosition();
	    	}

  			var surfW = surfSizes.surfW;
  			var surfH = surfSizes.surfH;

  			var surfProp = surfW/surfH;
  			//устанавливаем размеры контейнера
  			$('#mjpegContainer').css('width', surfW+'px');
  			$('#mjpegContainer').css('height', surfH+'px');
  			//размеры и пропорции потока
  			var streamW, streamH;
	    	mjpegPlayer.mjpegW = data.width;
	    	mjpegPlayer.mjpegH = data.height;

  			var streamProp = mjpegPlayer.mjpegW/mjpegPlayer.mjpegH;

  			//если поверхность шире потока
  			if(surfProp <= streamProp){
  				$('#test-livecam-jpg').css('left', 0+'px');
  				streamW = surfW;
  				streamH = streamW/streamProp;
  				var topPad = (surfH - streamH)/2;
  				$('#test-livecam-jpg').css('top', topPad+'px');
  			}else{
  			//если поверхность выше потока
  				$('#test-livecam-jpg').css('top', 0+'px');
  				streamH = surfH;
  				streamW = streamH*streamProp;
  				var leftPad = (surfW - streamW)/2;
  				$('#test-livecam-jpg').css('left', leftPad+'px');
  			}

  			$('#test-livecam-jpg').css('width', streamW+'px');
  			$('#test-livecam-jpg').css('height', streamH+'px');

  			var NetavisString = '{"url_mjpeg": "http://'+mjpegPlayer.IP+':8080", "url_jpg": "http://'+mjpegPlayer.IP+':8080", "width": "'+streamW+'", "height": "'+streamH+'", "fullscreen": 0}';

  			$("#test-livecam-jpg").html(NetavisString);

  			LiveCamPage.single = new LiveCamPage();
			LiveCamPage.single.main();
	  	}
	});
};

mjpegPlayer.compareSizes = function(){
	$.ajax({
  		url: 'modules/getMjpegSize.php',
  		dataType: 'json',
  		success: function(data){
    		var newMjpegW = data.width;
    		var newMjpegH = data.height;

    		if(mjpegPlayer.mjpegW != newMjpegW || mjpegPlayer.mjpegH != newMjpegH)
				mjpegPlayer.initPlayer(); 		
    		}
	});
};

mjpegPlayer.VideoControlsHide = function(){
	$('#videoPlayer').animate({ opacity: "0" }, 200);
	setTimeout("$('#videoPlayer').css('display', 'none')", 200);
	mjpegPlayer.isVideoContHidden = true;
}
mjpegPlayer.VideoControlsShow = function(){
	$('#videoPlayer').css('display', 'block');
	$('#videoPlayer').animate({ opacity: "1" }, 200);
	mjpegPlayer.isVideoContHidden = false;
}

$(document).ready(function(){
	$('#test-livecam-jpg').click(function(){	
		if(mjpegPlayer.isPhotoPlayer){
			if(mjpegPlayer.photoPlayer.controlsHidden){
				mjpegPlayer.photoPlayer.controlsShow();
			}else{
				mjpegPlayer.photoPlayer.controlsHide();
			}
		}
		if(mjpegPlayer.isVideoPlayer){
			if(mjpegPlayer.isVideoContHidden){
				mjpegPlayer.VideoControlsShow();
				mjpegPlayer.isVideoContHidden = false;
			}else{
				mjpegPlayer.VideoControlsHide();
				mjpegPlayer.isVideoContHidden = true;
			}
		}
	});
});

mjpegPlayer.getCapturePosition = function(){
	var surfW = $(window).width();
  	var surfH = $(window).height() - $('#header').height() - $('#MainBtnBmp').height() - $('#showGalleryBtn').height();

  	var sizes = {};
  	sizes.surfW = surfW;
  	sizes.surfH = surfH;

  	return sizes;
};
mjpegPlayer.getVideoPlayerPosition = function(){
	var surfW, surfH;
	surfW = $(window).width();
	surfH = $(window).height();

	var sizes = {};
  	sizes.surfW = surfW;
  	sizes.surfH = surfH;

  	return sizes;
}
mjpegPlayer.getPhotoPlayerPosition = function(){
	var surfW, surfH;
	surfW = $(window).width();
	surfH = $(window).height();

	var sizes = {};
  	sizes.surfW = surfW;
  	sizes.surfH = surfH;

  	return sizes;
}

mjpegPlayer.EnableVideoPlay = function(){
	mjpegPlayer.isVideoPlayer = true;

	$('#mjpegContainer').css('position', 'fixed');
	$('#mjpegContainer').css('top', 0);

	mjpegPlayer.initPlayer();
	//mjpegPlayer.VideoControlsHide();
	//$('#mjpeg').css('position', 'static');
};
mjpegPlayer.DisableVideoPlay = function(){
	mjpegPlayer.isVideoPlayer = false;
	
	$('#mjpegContainer').css('position', 'static');
	mjpegPlayer.initPlayer();
	$('#mjpeg').css('position', 'relative');
};
mjpegPlayer.EnablePhotoPlay = function(){
	mjpegPlayer.isPhotoPlayer = true;
	
	$('#mjpegContainer').css('position', 'fixed');
	$('#mjpegContainer').css('top', 0);

	mjpegPlayer.initPlayer();
	mjpegPlayer.PhotoControlsHide();
};
mjpegPlayer.DisablePhotoPlay = function(){
	mjpegPlayer.isPhotoPlayer = false;
	
	$('#mjpegContainer').css('position', 'static');
	mjpegPlayer.initPlayer();
	$('#mjpeg').css('position', 'relative');
};
*/
//ПЛЕЕР ФОТО---------------------------------------------------

mjpegPlayer.photoPlayer = {};

mjpegPlayer.photoPlayer.photosArray = [];
mjpegPlayer.photoPlayer.activePhoto = 0;
mjpegPlayer.photoPlayer.controlsHidden = true;

//открытие фотоплеера
mjpegPlayer.photoPlayer.init = function(isMulti, index){
	mjpegPlayer.isPhotoPlayer = true;
	mjpegPlayer.photoPlayer.photosArray = [];
	//mjpegPlayer.photoPlayer.createSurf();

	$('.mediaPhoto').each(function(){
		var screenItem = {};
		screenItem.path = $(this).attr('path');
		//screenItem.path = $(this).children('.mediaBlockContent').children('.mediaBlockImage').children('div').attr('pic');

		if(isMulti){
			if($(this).children('.mediaBlockContent').children('.mediaBlockImage').children('.mediaChecked').hasClass('checked')){
				mjpegPlayer.photoPlayer.photosArray.push(screenItem);
			}
		}else{
			mjpegPlayer.photoPlayer.photosArray.push(screenItem);
		}
	});

	if(isMulti){
		mjpegPlayer.photoPlayer.activePhoto = 0;
	}else{
		for(var i=0; i<mjpegPlayer.photoPlayer.photosArray.length; i++){
			if(mjpegPlayer.photoPlayer.photosArray[i].path == index){
				mjpegPlayer.photoPlayer.activePhoto = i;
				break;
			}
		}
	}

	mjpegPlayer.photoPlayer.controlsHide();

	mjpegPlayer.photoPlayer.showImage(mjpegPlayer.photoPlayer.activePhoto);
}
//подгонка поверхностей
mjpegPlayer.photoPlayer.createSurf = function(){
	/*$('#mjpegContainer').css('position', 'fixed');
	$('#mjpegContainer').css('top', 0);

	var surfW, surfH;
	surfW = $(window).width();
	surfH = $(window).height();

	$('#mjpegContainer').css('width', surfW+'px');
  	$('#mjpegContainer').css('height', surfH+'px');

  	$('#test-livecam-jpg').html('');

  	$('#test-livecam-jpg').css('top', '0px');
  	$('#test-livecam-jpg').css('left', '0px');
  	$('#test-livecam-jpg').css('max-width', '');
  	$('#test-livecam-jpg').css('max-height', '');

	$('#test-livecam-jpg').css('width', surfW+'px');
  	$('#test-livecam-jpg').css('height', surfH+'px');*/
}
//скрытие элементов управления
mjpegPlayer.photoPlayer.controlsHide = function(){
	$('#screenPlayer').animate({ opacity: "0" }, 200);
	setTimeout("$('#screenPlayer').css('display', 'none')", 200);
	mjpegPlayer.photoPlayer.controlsHidden = true;
}
//показ элементов управления
mjpegPlayer.photoPlayer.controlsShow = function(){
	$('#screenPlayer').css('display', 'block');
	$('#screenPlayer').animate({ opacity: "1" }, 200);
	mjpegPlayer.photoPlayer.controlsHidden = false;
}
//открытие фото
mjpegPlayer.photoPlayer.showImage = function(index){
	$('#screenPlayerSurface').css('backgroundImage', 'url('+mjpegPlayer.photoPlayer.photosArray[index].path+')');
	mjpegPlayer.photoPlayer.activePhoto = index;
}
//следующее фото
mjpegPlayer.photoPlayer.next = function(){
	var photoIndex = 0;
	if(mjpegPlayer.photoPlayer.activePhoto+1 >= mjpegPlayer.photoPlayer.photosArray.length){
		photoIndex = 0;
	}else{
		photoIndex = mjpegPlayer.photoPlayer.activePhoto+1;
	}

	$('#screenPlayerSurface').css('backgroundImage', 'url('+mjpegPlayer.photoPlayer.photosArray[photoIndex].path+')');
	mjpegPlayer.photoPlayer.activePhoto = photoIndex;
}
//предыдущее фото
mjpegPlayer.photoPlayer.prev = function(){
	var photoIndex = 0;
	if(mjpegPlayer.photoPlayer.activePhoto-1 < 0){
		photoIndex = mjpegPlayer.photoPlayer.photosArray.length - 1;
	}else{
		photoIndex = mjpegPlayer.photoPlayer.activePhoto-1;
	}

	$('#screenPlayerSurface').css('backgroundImage', 'url('+mjpegPlayer.photoPlayer.photosArray[photoIndex].path+')');
	mjpegPlayer.photoPlayer.activePhoto = photoIndex;
}
mjpegPlayer.photoPlayer.close = function(){
	$('#screenPlayerSurface').css('backgroundImage', '');
	mjpegPlayer.isPhotoPlayer = false;
}


$(document).ready(function(){
	//Воспроизведение снимков---------------------------------------------------------------------------------------
	$('.mediaContainer').on('click', '.playScreenLink', function () {
		var screenId = $(this).attr("path");

		mjpegPlayer.photoPlayer.init(false,screenId);
	});

	//отырытие фотоплеера
	$('.mediaContainer').on('click', '.playScreenLink', function () {
		$('#screenPlayer').animate({ bottom: "0" }, "slow");
		$('#screenPlayerSurface').css('display', 'block');
		$('#screenPlayerSurface').animate({ opacity: "1" }, "slow");
	});
	//закрытие фотоплеера
	$('.btnScrClose').click(function(){
		$('#screenPlayer').animate({ bottom: "-241" }, "slow");
		$('#screenPlayerSurface').animate({ opacity: "0" }, "slow");
		setTimeout("$('#screenPlayerSurface').css('display', 'none')", 1000);
		/*if(!isMjpeg){
			ShadowLayerHide();
		}else{
			CheckMagicSelect();
		}*/
	});
	//сокрытие элементов управления
	$('#screenPlayerSurface').click(function(){	
		if(mjpegPlayer.isPhotoPlayer){
			if(mjpegPlayer.photoPlayer.controlsHidden){
				mjpegPlayer.photoPlayer.controlsShow();
			}else{
				mjpegPlayer.photoPlayer.controlsHide();
			}
		}
		if(mjpegPlayer.isVideoPlayer){
			if(mjpegPlayer.isVideoContHidden){
				mjpegPlayer.VideoControlsShow();
				mjpegPlayer.isVideoContHidden = false;
			}else{
				mjpegPlayer.VideoControlsHide();
				mjpegPlayer.isVideoContHidden = true;
			}
		}
	});
	//влево------------------
	$('.btnScrLeft').click(function () {
		mjpegPlayer.photoPlayer.prev();
	});
	//вправо-----------------
	$('.btnScrRight').click(function () {
		mjpegPlayer.photoPlayer.next();
	});

	$('.mediaContainer').on('click', '.playVideoLink', function () {
		var path = $(this).attr('path');
		//console.log(path);
		window.open(path,'_blank');
	});
});