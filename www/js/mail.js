$(document).ready(function(){
	//открытие формы отправки фото и видео по имейл
	$('.mediaContainer').on('click', '.mailLink', function () {
		var media = '';
		if($(this).parent().parent().parent().hasClass('mediaPhoto')){
			media = 'photo';
		}else{
			media = 'video';
		}

		if(media == 'photo'){
			var screenPath = $(this).attr('href').replace(new RegExp("\\\\\\\\",'g'),"/");
			$('.mailScreenPreviewContainer img').attr('src', 'media/'+screenPath);
			//$(".shadowLayer").css("display", "block");
			var h = screen.height;
			$("#sendPhotoForm").height($(document).height());
			$("#sendPhotoForm").slideToggle('slow');
		}else{
			var screenPath = $(this).attr('href').replace(new RegExp("\\\\\\\\",'g'),"/");
			$('.mailScreenPreviewContainer img').attr('src', 'media/'+screenPath);
			//$(".shadowLayer").css("display", "block");
			var h = screen.height;
			$("#sendVideoForm").height($(document).height());
			$("#sendVideoForm").slideToggle('slow');
		}
	});
	//открытие мультифото
	$('#multiMenuContent').on('click', '#multiScreenMail', function(){
		$('#multiMenuCancel').trigger('click');
		$('#multiSendPhotoForm > div.mailScreenPreviewContainer').html('');
		$('#multiSendPhotoForm > div.mailScreenPreviewContainer').html('<h4>'+'Photos: '+'</h4>');

		for(var i=0; i<selectedPhotos.length; i++){
			$('#multiSendPhotoForm > div.mailScreenPreviewContainer').html($('#multiSendPhotoForm > div.mailScreenPreviewContainer').html() + '<img width=33%  class="photoToEmail" src="'+selectedPhotos[i]+'">');
		}
		$("#multiSendPhotoForm").height($(document).height());
		$("#multiSendPhotoForm").slideToggle('slow');
	});
	//мультивидео
	$('#multiMenuContent').on('click', '#multiVideoMail', function(){
		$('#multiMenuCancel').trigger('click');

		$('#multiSendVideoForm > div.mailVideoPreviewContainer').html('<h4>Videos: </h4>');

		for(var i=0; i<selectedVideos.length; i++){
			$('#multiSendVideoForm > div.mailVideoPreviewContainer').html($('#multiSendVideoForm > div.mailVideoPreviewContainer').html() + '<h4><a target="_blank" id="multiEmailVideo" class="videoToEmail" href="'+selectedVideos[i]+'">Link</a></h4>');
		}
		$("#multiSendVideoForm").height($(document).height());
		$("#multiSendVideoForm").slideToggle('slow');
	});
	//мультифотовидео
	$('#multiMenuContent').on('click', '#multiScreenVideoMail', function(){
		$('#multiMenuCancel').trigger('click');

		$('#multiSendPhotoVideoForm > div.mailVideoPreviewContainer').html('<h4>Videos: </h4>');
		for(var i=0; i<selectedVideos.length; i++){
			$('#multiSendPhotoVideoForm > div.mailVideoPreviewContainer').html($('#multiSendPhotoVideoForm > div.mailVideoPreviewContainer').html() + '<h4><a target="_blank" id="multiEmailVideo" class="videoToEmail" href="'+selectedVideos[i]+'">Link</a></h4>');
		}

		$('#multiSendPhotoVideoForm > div.mailVideoPreviewContainer').html($('#multiSendPhotoVideoForm > div.mailVideoPreviewContainer').html() + '<h4>Photos: </h4>');
		for(var i=0; i<selectedPhotos.length; i++){
			$('#multiSendPhotoVideoForm > div.mailVideoPreviewContainer').html($('#multiSendPhotoVideoForm > div.mailVideoPreviewContainer').html() + '<img width=33% class="photoToEmail" src="'+selectedPhotos[i]+'">');
		}

		$("#multiSendPhotoVideoForm").height($(document).height());
		$("#multiSendPhotoVideoForm").slideToggle('slow');
	});
	//закрытие форм
	$('#btnCancelScreenMail').click(function(){
		$("#sendPhotoForm").slideToggle('slow');
	});
	$('#btnCancelVideoMail').click(function(){
		$("#sendVideoForm").slideToggle('slow');
	});
	$('#multiBtnCancelScreenMail').click(function(){
		$('#multiSendPhotoForm').slideToggle('slow');
	});
	$('#multiBtnCancelVideoMail').click(function(){
		$('#multiSendVideoForm').slideToggle('slow');
	});
	$('#multiBtnCancelPhotoVideoMail').click(function(){
		$('#multiSendPhotoVideoForm').slideToggle('slow');
	});

	//Отправка по имейл---------------------------------------------------------------------------------------
	$('.btnSendMail').click(function(){
		var name = $(this).parent().parent().find('.emailNameField').val();
		var email = $(this).parent().parent().find('.emailRecieverField').val();
		var comment = $(this).parent().parent().find('.emailCommentField').val();
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var isCorrectInput = true;
		//проверка email
		if (!regex.test(email)) {
			$(this).parent().parent().find('.emailRecieverField').addClass('error');
			isCorrectInput = false;
		} else {
			$(this).parent().parent().find('.emailRecieverField').removeClass('error');
		}
		//проверка имени
		if (name == '') {
			$(this).parent().parent().find('.emailNameField').addClass('error');
			isCorrectInput = false;
		} else {
			$(this).parent().parent().find('.emailNameField').removeClass('error');
		}
		if (isCorrectInput) {
			//определяем медиа для отправки
			var ph = [];
			var vid = [];
			$(this).parent().parent().find('.photoToEmail').each(function(){
				ph.push($(this).attr('src'));
			});
			$(this).parent().parent().find('.videoToEmail').each(function(){
				vid.push($(this).attr('href'));
			});

			var phStr = JSON.stringify(ph);
			var vidStr = JSON.stringify(vid);

			$.get("modules/mailSender.php", {
				senderName: name,
				recieverEmail: email,
				mailComment: comment,
				photos: phStr,
				videos: vidStr
			});
		}
		$(this).parent().parent().slideToggle('slow');
	});
});
	