$(document).ready(function(){
	//удаление всего
	$('#footerClearAll').click(function(){
		var data = {};
		data.action="deleteAll";
		$.ajax({
			url: "previews.php",
			type: "POST",
			data: data
		});
	});
	//удаление мультивыбора
	$('#multiMenuContent').on('click', '#multiDelete', function(){
		if(selectedPhotos.length > 0){
			for(var i = 0; i < selectedPhotos.length; i++){
				var bgCss = $("div[path='"+selectedPhotos[i]+"']").children('.mediaBlockContent').children('.mediaBlockImage').children('.imageContainer').css('background-image');
				bgCss = bgCss.split('/').pop().slice(0, -1);

				var data={};
				data.delete1=bgCss;
				$.ajax({
					url: "previews.php?act=del",
					type: "POST",
					data: data
				});
			}
		}
		if(selectedVideos.length > 0){
			for(var i = 0; i < selectedVideos.length; i++){
				var bgCss = $("div[path='"+selectedVideos[i]+"']").children('.mediaBlockContent').children('.mediaBlockImage').children('.imageContainer').css('background-image');
				bgCss = bgCss.split('/').pop().slice(0, -1);

				var data={};
				data.delete1=bgCss;
				$.ajax({
					url: "previews.php?act=del",
					type: "POST",
					data: data
				});
			}
		}
		$('#footerSelectCancel').trigger('click');
		$('#multiMenuCancel').trigger('click');
	});
});