var overlay = {};

$(document).ready(function(){
	overlay.alert = "alert";
	overlay.secsLeft = 0;
	overlay.shadowSecsOpacity = 1;

	overlay.counterInterval = "";
	overlay.shadowInterval = "";

	//конструктор
	overlay.init = function(){
		$('.liveimage').html($('.liveimage').html()+'<div id="overlaySurface"></div>');
		$('.liveimage').find('#overlaySurface').css('line-height', $('.liveimage').css('height'));
		$('.liveimage').find('#overlaySurface').css('font-size', $('.liveimage').css('height')/3 + 'px');
	}

	//отправка текста
	overlay.sendText = function(text){
		$('.liveimage').find('#overlaySurface').css('line-height', $('.liveimage').css('height'));
		$('.liveimage').find('#overlaySurface').css('font-size', $('.liveimage').css('height')/3 + 'px');

		$('.liveimage').find('#overlaySurface').html('text');
		setTimeout("$('.liveimage').find('#overlaySurface').html('');", 1000);
	}

	//итерация счетчика для Интервала
	overlay.countIteration = function(){
		if(overlay.secsLeft == 0){
			$('.liveimage').find('#overlaySurface').html('');
			clearInterval(overlay.counterInterval);
			ajax_cmd.open("GET","cmd_pipe.php?cmd=" + "im",true);
    		ajax_cmd.send();
    		overlay.shadow();
			return;
		}else{
			$('.liveimage').find('#overlaySurface').html(overlay.secsLeft);
			overlay.secsLeft--;
		}
	}

	//обратный отсчет в секундах
	overlay.count = function(sec){
		overlay.secsLeft = sec;	
		//гасим кнопки
		document.getElementById("MainBtnAvi").className = "btnDisabled";
		document.getElementById("MainBtnBmp").className = "btnDisabled";
		document.getElementById("MainBtnAvi").onclick = function() {};
		document.getElementById("MainBtnBmp").onclick = function() {};
		//отправляем первую секунду
		$('.liveimage').find('#overlaySurface').html(overlay.secsLeft);
		//итерируем
		overlay.secsLeft--;
		overlay.counterInterval = setInterval("overlay.countIteration();", 1000);
	}

	//отображение тени вспышки
	overlay.shadow = function(){
		overlay.shadowSecsOpacity = 1;
		$('.liveimage').find('#overlaySurface').css('background-color', '#000');
		overlay.shadowInterval = setInterval('overlay.shadowIteration();', 20);
	}
	overlay.shadowIteration = function(){
		console.log(overlay.shadowSecsOpacity);
		if(overlay.shadowSecsOpacity < 0){
			$('.liveimage').find('#overlaySurface').css('background-color', '');
			$('.liveimage').find('#overlaySurface').css('opacity', '');
			clearInterval(overlay.shadowInterval);
			return;
		}
		$('.liveimage').find('#overlaySurface').css('opacity', overlay.shadowSecsOpacity - 0.1);
		overlay.shadowSecsOpacity = overlay.shadowSecsOpacity - 0.1;
	}

	overlay.init();
	//overlay.count(8);
});