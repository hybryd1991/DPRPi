//переменные, хранящие id групп для публикаций
var fbGroupValue = [];
var vkGroupValue = [];
var vkAlbumValue = [];

//показываем окно авторизаций и выбора групп
$("#socialAutorize").slideToggle('slow');

//инициализируем информацию в окне авторизаций
freezePage();
$.ajax({
	url: "modules/facebook/facebook.php",
	type: "GET",
	data: "event=getAuthorize",
	dataType: 'json'
}).done(function(data) {
	unFreezePage();
  	if(data.authorized == true){
  		if(data.error == true){
  			$("#facebookAutorizeBody").html(locals.groupMode.groupSelect.notAuthorized);
  			return;
  		}
  		//если пользователь авторизован
  		$("#facebookAutorizeBody").html(locals.groupMode.groupSelect.authorized);
  		$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + data.account.name);
  		$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '<h4>'+locals.groupMode.groups+'</h4>');
  		$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '<div>');
  		var i;
  		for(i=0; i<data.groups.data.length; i++){
  			$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '<div class="checkbox"><label><input type="checkbox" name="chbFBGroups" id="chbFB'+i+'" value="'+data.groups.data[i].id+'">'+data.groups.data[i].name+'</label></div>');
  		}
  		$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '</div>');
  		$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '<h4>'+locals.groupMode.events+'</h4>');
  		$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '<div>');
  		for(var j=0; j<data.events.data.length; j++){
  			var chbIter = j+i;
  			$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '<div class="checkbox"><label><input type="checkbox" name="chbFBGroups" id="chbFB'+chbIter+'" value="'+data.events.data[j].id+'">'+data.events.data[j].name+'</label></div>');
  		}
  		$("#facebookAutorizeBody").html($("#facebookAutorizeBody").html() + '</div>');
  	}else{
  		//если не авторизован
  		$("#facebookAutorizeBody").html(locals.groupMode.groupSelect.notAuthorized);
  	}
});
//получаем данные ВК
var vkData;
$.ajax({
	url: "modules/facebook/vk.php",
	type: "GET",
	data: "event=getGroupsData",
	dataType: 'json'
}).done(function(data){
	for(var i=0; i<data.groups.length; i++){
		vkData = data;
		$('#vkGroups').html($('#vkGroups').html() + '<div class="checkbox"><label class="checkbox"><input name="chbVKGroups" id="chbVK'+i+'" value="'+data.groups[i].id+'" type="checkbox"> '+data.groups[i].name+' </label></div>');
		
		var albumsText = '<div class="vkGroupAlbums" groupId="' + data.groups[i].id + '">';
		for(var j=0; j<data.groups[i].albums.length; j++){
			albumsText += '<label class="radio"><input name="radioVKAlbums'+i+'" id="radioVKAlbum'+i+'" value="'+data.groups[i].albums[j].id+'" type="radio"> '+data.groups[i].albums[j].name+' </label>';
		}
		albumsText += '</div>';

		$('#vkGroups').html($('#vkGroups').html() + albumsText);
	}
});
//раскрытие списка альбомов
$(document).ready(function(){
	$('#vkGroups').on('click', 'input', function(){
		var groupId = $(this).attr('value');
		if(!groupId){
			return;
		}
		var checked = $(this).prop("checked");
		var data = vkData; 

		$(".vkGroupAlbums").each(function(){
			if($(this).attr('groupId') == groupId){
				if(checked){
					$(this).css('display', 'block');
				}else{
					$(this).css('display', 'none');
					$(this).find('input').each(function(){
						$(this).prop('checked', false);
					});
				}
			}
		});
	});
});

//при нажатии на кнопку Начать
$(document).ready(function(){
	$('#btnStreamBegin').click(function(){
		fbGroupValue = [];
		vkGroupValue = [];
		vkAlbumValue = [];

		//массив групп фейсбука
		$("input:checkbox[name ='chbFBGroups']:checked").each(function(){
			fbGroupValue.push($(this).attr('value'));
		});
		//массив групп ВК
		$("input:checkbox[name ='chbVKGroups']:checked").each(function(){
			vkGroupValue.push($(this).attr('value'));
		});
		//массив альбомов ВК
		$(".vkGroupAlbums input:checked").each(function(){
			vkAlbumValue.push($(this).attr('value'));
		});

		/*$('#btnVKSend').attr('groupId', vkGroupRadio);
		$('#btnVKSend').attr('albumId', vkAlbumsRadio);
		$('#btnVKSend').attr('message', defMessage);*/

		var defMessage = $("#socialMessage textarea").val();
		$('.btnFBSend').attr('pageid', fbGroupValue);
		$('.btnFBSend').attr('message', defMessage);
		if(defMessage != ''){
			$('.socialMessagePrefix').html(locals.groupMode.groupSelect.standartComment);
			$('.socialMessageSelf').html(defMessage);
		}else{
			$('.socialMessagePrefix').html(locals.groupMode.defaultCommentNotSet);
		}

		if(fbGroupValue.length == 0 && vkGroupValue.length == 0){
			alert(locals.groupMode.groupSelect.alertSelectGroups);
			return;
		}
		if(vkGroupValue.length != vkAlbumValue.length){
			alert(locals.groupMode.groupSelect.alertSelectAlbums);
			return;
		}

		$("#socialAutorize").slideToggle('slow');
	});
});