var mjpegPlayer = {};

mjpegPlayer.mjpegW = 0;
mjpegPlayer.mjpegH = 0;
mjpegPlayer.IP = '';

mjpegPlayer.isVideoPlayer = false;
mjpegPlayer.isPhotoPlayer = false;

mjpegPlayer.isVideoContHidden = false;
mjpegPlayer.isPhotoContHidden = false;

//ПЛЕЕР ВИДЕО--------------------------------------------------
var videoPlayer;
mjpegPlayer.videoPlayer = {};
mjpegPlayer.videoPlayer.init = function(filename){
	mjpegPlayer.isVideoPlayer = true;
	$('#videoPlayerSurface').css('display', 'block');
	$('#videoPlayerSurface').animate({ opacity: "1" }, "slow");
	if(videoPlayer)
		videoPlayer.destroy();
	videoPlayer = CodoPlayer(filename,
							{
								title: "Delay-Play Video",
				                width: $(window).width(),
				                height: $(window).height(),
				                engine: 'auto' / 'html5' / 'flash',
				                controls: {
				                    show: 'always',
				                    hideDelay: 5,
				                    play: true,
				                    playBtn: true,
				                    seek: true,
				                    volume: 'horizontal',
				                    fullscreen: false,
				                    title: true,
				                    time: true
				                }
				            },
				            "#videoPlayerSurface");
}

//ПЛЕЕР ФОТО---------------------------------------------------

mjpegPlayer.photoPlayer = {};

mjpegPlayer.photoPlayer.photosArray = [];
mjpegPlayer.photoPlayer.activePhoto = 0;
mjpegPlayer.photoPlayer.controlsHidden = true;

//открытие фотоплеера
mjpegPlayer.photoPlayer.init = function(isMulti, index){
	mjpegPlayer.isPhotoPlayer = true;
	mjpegPlayer.photoPlayer.photosArray = [];

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
	$('#screenPlayer').animate({ bottom: "0" }, "slow");
	$('#screenPlayerSurface').css('display', 'block');
	$('#screenPlayerSurface').animate({ opacity: "1" }, "slow");

	if(isMulti){
		$('#multiMenuCancel').trigger('click');
	}

	mjpegPlayer.photoPlayer.controlsHide();

	mjpegPlayer.photoPlayer.showImage(mjpegPlayer.photoPlayer.activePhoto);
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
	//Воспроизведение снимков мультиселект
	$('#multiMenuContent').on('click', '#multiScreenPlay', function(){
		var screenId = $(this).attr("path");
		mjpegPlayer.photoPlayer.init(true, screenId);
	});
	//закрытие фотоплеера
	$('.btnScrClose').click(function(){
		$('#screenPlayer').animate({ bottom: "-241" }, "slow");
		$('#screenPlayerSurface').animate({ opacity: "0" }, "slow");
		setTimeout("$('#screenPlayerSurface').css('display', 'none')", 1000);
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

	//Воспроизведение видео
	$('.mediaContainer').on('click', '.playVideoLink', function () {
		var fileName = $(this).attr('path');
		mjpegPlayer.videoPlayer.init(fileName);
		$('#videoPlayer').animate({ top: "0" }, "slow");
	});
	//закрытие видеоплеера
	$('.btnVidClose').click(function(){
		$('#videoPlayer').animate({ top: "-270" }, "slow");
		$('#videoPlayerSurface').animate({ opacity: "0" }, "slow");
		setTimeout("$('#videoPlayerSurface').css('display', 'none')", 1000);
	});
});