//открытие формы настроек
$(document).ready(function(){
	$('#MainBtnConf').click(function(){
		$("#configsForm").height($(document).height());
		$("#configsForm").slideToggle('slow');
	});
	//закрытие
	$('.btnConfigClose').click(function(){
		$("#configsForm").slideToggle('slow');
	});
})

//отображение галереи
$(document).ready(function(){
	var galUpdateInterval = setInterval('updateGallery()', 1000);
	//updateGallery();
});

var galleryCache = '';
function updateGallery(){
	$.ajax({
		url: "previews.php"
	}).done(function( data ) {
	    if(data != galleryCache){
	    	$('.mediaContainer').html(data);
	    	galleryCache = data;
	    }
	 });
}
function GalleryItemMenuShow(th){
	var divs = document.getElementsByTagName("div");
	for(var i = 0; i < divs.length; i++){
		if(divs[i].className == "mediaBlockContent"){
			if(divs[i].style.bottom == "110px"){
				var elem = divs[i];
				$(elem).animate({bottom: "0"}, 300);
			}
		}
	}
	var par = th.parentNode.parentNode;
	$(par).animate({bottom: "110"}, 300);
}

function GalleryItemMenuClose(th){
	var par = th.parentNode.parentNode.parentNode.parentNode;
	$(par).animate({bottom: "0"}, 300);
}
//меню элементов галереи
//var isMultiselect = false;
$(document).ready(function(){
	$('.mediaContainer').on('click', '.mediaBlockImage', function(){
		if(!isMultiselect){
			var galleryItems =  document.getElementsByTagName("div");
			for(var i = 0; i < galleryItems.length; i++){
				if(galleryItems[i].className == "mediaBlockContent"){
					if(galleryItems[i].style.bottom == "148px"){
						var elem = galleryItems[i];
						$(elem).animate({bottom: "0"}, 300);
					}
				}
			}
			$(this).parent().animate({bottom: "148"}, 300);
		}else{
			if($(this).find('.mediaChecked').hasClass('checked')){
				$(this).find('.mediaChecked').animate({ opacity: "hide" }, "fast");
				$(this).find('.mediaChecked').removeClass('checked');
			}else{
				$(this).find('.mediaChecked').animate({ opacity: "show" }, "fast");
				$(this).find('.mediaChecked').addClass('checked');
			}
		}
	});

	//вход в режим мультивыбора
	$('#footerSelect').click(function(){
		var galleryItems =  document.getElementsByTagName("div");
		for(var i = 0; i < galleryItems.length; i++){
			if(galleryItems[i].className == "mediaBlockContent"){
				if(galleryItems[i].style.bottom == "148px"){
					var elem = galleryItems[i];
					$(elem).animate({bottom: "0"}, 300);
				}
			}
		}
		$('#footerSelect').css('display', 'none');
		$('#footerClearAll').css('display', 'none');
		$('#footerSelectAction').css('display', 'block');
		$('#footerSelectCancel').css('display', 'block');
	});
	//выход из мультивыбора
	$('#footerSelectCancel').click(function(){
		$('.mediaBlock').find('.mediaChecked').animate({ opacity: "hide" }, "fast");
		$('.mediaBlock').find('.mediaChecked').removeClass('checked');
		//$('.mediaBlock').animate({borderWidth: "2"}, 300);
		//$('.mediaBlock').animate({borderColor: "#a7bdd0"}, 300);
		$("#magicSelectNotify").animate({ opacity: "hide" }, 200);

		$('#footerSelect').css('display', 'block');
		$('#footerClearAll').css('display', 'block');
		$('#footerSelectAction').css('display', 'none');
		$('#footerSelectCancel').css('display', 'none');
	});
	//меню мультивыбора
	$('#footerSelectAction').click(function(){
		//если ничего не выбрано
		if(selectedPhotos.length == 0 && selectedVideos.length == 0){
			alert('Nothing selected!');
			return;
		}
		//если выбраны только фото
		if(selectedPhotos.length != 0 && selectedVideos.length == 0){
			var menuText = '';
			menuText += '<div class="multiMenuItem" id="multiScreenPlay">'+locals.selectMenu.play+'</div>';
			if(magicSelect){
				menuText += '<div class="multiMenuItem" id="multiScreenCompose">'+locals.selectMenu.compose+'</div>';
				menuText += '<div class="multiMenuItem" id="multiScreenMail">'+locals.selectMenu.mail+'</div>';
				menuText += '<div class="multiMenuItem" id="multiScreenPublish">'+locals.selectMenu.publish+'</div>';
			}else{
				menuText += '<div class="multiMenuItem" id="multiScreenMail">'+locals.selectMenu.mail+'</div>';
				menuText += '<div class="multiMenuItem" id="multiScreenPublish">'+locals.selectMenu.publish+'</div>';
			}
			menuText += '<div class="multiMenuItem" id="multiDelete">'+locals.selectMenu.delete+'</div>';

			$('#multiMenuContent').html(menuText);
			$('#multiMenu').animate({ bottom: "0" }, "slow");
			//ShadowLayerShow();
			return;
		}
		//если выбраны только видео
		if(selectedPhotos.length == 0 && selectedVideos.length != 0){
			var menuText = '';
			menuText += '<div class="multiMenuItem" id="multiVideoMail">'+locals.selectMenu.mail+'</div>';
			//menuText += '<div class="multiMenuItem" id="multiVideoPublish"><span class="blue">О</span>публиковать</div>';
			menuText += '<div class="multiMenuItem" id="multiDelete">'+locals.selectMenu.delete+'</div>';

			$('#multiMenuContent').html(menuText);
			$('#multiMenu').animate({ bottom: "0" }, "slow");
//			ShadowLayerShow();

			return;
		}
		//если выбраны и фото, и видео
		if(selectedPhotos.length != 0 && selectedVideos.length != 0){
			var menuText = '';
			menuText += '<div class="multiMenuItem" id="multiScreenVideoMail">'+locals.selectMenu.mail+'</div>';
			//menuText += '<div class="multiMenuItem" id="multiScreenVideoPublish><span class="blue">О</span>публиковать</div>';
			menuText += '<div class="multiMenuItem" id="multiDelete">'+locals.selectMenu.delete+'</div>';

			$('#multiMenuContent').html(menuText);
			$('#multiMenu').animate({ bottom: "0" }, "slow");
			//ShadowLayerShow();

			return;
		}
	});
	//закрытие мультименю
	$('#multiMenuCancel').click(function(){
		$('#multiMenu').animate({ bottom: "-232" }, "slow");
		//ShadowLayerHide();
	});
});