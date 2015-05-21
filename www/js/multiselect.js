var isMultiselect = false;
var selectedPhotos = [];
var selectedVideos = [];
var magicSelect = false;

$(document).ready(function(){
	//установка переменной мультивыбора
	$('#footerSelect').click(function(){
		isMultiselect = true;
	});
	$('#footerSelectCancel').click(function(){
		isMultiselect = false;
	});
	//добавление/удаление элемента в массив
	$('.mediaContainer').on('click', '.mediaBlockImage', function () {
		if(isMultiselect){
			var isPhoto = $(this).parent().parent().hasClass('mediaPhoto');
			if(isPhoto){
				//если фото
				var photoIndex = $(this).parent().parent().attr('path');
				//проверяем, входит ли элемент в уже выбранные
				var inSelected = $.inArray(photoIndex, selectedPhotos);
				if(inSelected == -1){
					//если не входит
					selectedPhotos.push(photoIndex);
				}else{
					//если входит
					selectedPhotos.splice(inSelected, 1);
				}
				//сортируем
				selectedPhotos.sort();
				//CheckMagicSelect();
			}else{
				//если видео
				var videoIndex = $(this).parent().parent().attr('videoIndex');
				//проверяем, входит ли элемент в уже выбранные
				var inSelected = $.inArray(videoIndex, selectedVideos);
				if(inSelected == -1){
					//если не входит
					selectedVideos.push(videoIndex);
				}else{
					//если входит
					selectedVideos.splice(inSelected, 1);
				}
				//сортируем
				selectedVideos.sort();
				//CheckMagicSelect();
			}
		}
	});

	//отмена мультивыбора, обнуление массивов выбора
	$('#footerSelectCancel').click(function(){
		selectedPhotos = [];
		selectedVideos = [];
		magicSelect = false;
	});
});

function CheckMagicSelect(){
	if(selectedPhotos.length != 2 && selectedPhotos.length != 3 || selectedVideos.length != 0){
		$("#magicSelectNotify").animate({ opacity: "hide" }, 200);
		magicSelect = false;
		return;
	}

	var pic1 = $('[picscreenindex = "'+selectedPhotos[0]+'"]').attr('pic');
	var pic2 = $('[picscreenindex = "'+selectedPhotos[1]+'"]').attr('pic');
	var pic3 = $('[picscreenindex = "'+selectedPhotos[2]+'"]').attr('pic');

	$.getJSON("modules/getMagicSelect.php", {'pic1' : pic1, 'pic2' : pic2, 'pic3' : pic3}, function(data){
		if(data == true){
			//$("#magicSelectNotify").css("display", "block");
			$("#magicSelectNotify").animate({ opacity: "show" }, 200);
			magicSelect = true;

			//alert(1);
			if(!helper.isMagicSelected){
				helper.showHelp('magicselect');
				helper.isMagicSelected = true;
			}
		}else{
			$("#magicSelectNotify").animate({ opacity: "hide" }, 200);
			magicSelect = false;
		}
	});
}