$(document).ready(function(){
	videoboxPosition();
	setTimeout('videoboxPosition()', 1000);
});

$(window).resize(function(){
	videoboxPosition();
});

$('#video_width').change(function(){
	videoboxPosition();
});

$('#video_height').change(function(){
	videoboxPosition();
});

function videoboxPosition(){
	var scrWidth = $(window).width();
	var scrHeight = $(window).height();
	
	var headHeight = $('#header').height();
	var btnHeight = $('#mainButtons').height();
	var surfHeight = scrHeight - headHeight - btnHeight;
	var galHeight = $('#showGalleryBtn').height();
	$('.liveimage').height(surfHeight);
	
	$("#mjpeg_dest").load(function(){
		if($("#mjpeg_dest").height() != 0){
			var vidW = $('#video_width').val();
			var vidH = $('#video_height').val();

			var vidProp = vidW/vidH;
			var surfProp = $(window).width()/surfHeight;

			if(vidProp > surfProp){
				$("#mjpeg_dest").off('load');
				//полоски сверху
				$("#mjpeg_dest").css('width', '');
				$("#mjpeg_dest").css('height', '');
				$("#mjpeg_dest").css('margin-top', '');

				var imgW = $(window).width();
				var imgProp = vidW/imgW;
				var imgH = vidH/imgProp;
				var marginT = (surfHeight - imgH)/2;

				$("#mjpeg_dest").css('width', '100%');
				$("#mjpeg_dest").css('height', imgH+'px');
				$("#mjpeg_dest").css('margin-top', marginT+'px');
			}else{
				$("#mjpeg_dest").off('load');
				//полоски по бокам
				$("#mjpeg_dest").css('width', '');
				$("#mjpeg_dest").css('height', '');
				$("#mjpeg_dest").css('margin-top', '');

				var imgH = surfHeight;
				var imgProp = vidH/imgH;
				var imgW = vidW/imgProp;

				$("#mjpeg_dest").css('width', imgW + 'px');
				$("#mjpeg_dest").css('height', imgH+'px');
			}
		}
	});
};