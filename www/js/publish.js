$(document).ready(function(){
	//�������� ���� � �������
	$('.mediaContainer').on('click', '.mtmSocialScr', function () {
		//freezePage();
		var screenPath = $(this).parent().children('.playScreenLink').attr('path');
		var screenName = screenPath.replace("media/", "");

		$.get("modules/loadPhotoOnServer.php", {
			screenPath: screenPath,
			screenName: screenName
		});

		//VK
		document.getElementById('vkShare').innerHTML = VK.Share.button({
			url: 'http://photo.delay-play.com/index.php?item='+screenName.substring(0,screenName.lastIndexOf('.')),
			title: 'DelayPlay - ������� �����-�����������',
			description: '�������� ��� ����������, ��������� � ������� ����� �����-����������� DelayPlay!',
			noparse: false
		},{
			type: 'link',
			text: '<img src="images/icon_vk.png" width="25" alt="" style="width: 30px !important"> ���������'
		});

		//FB
		var linkPath = 'http://photo.delay-play.com/index.php?item=' + screenName.substring(0,screenName.lastIndexOf('.'));
		linkPath = encodeURIComponent(linkPath);
		document.getElementById('fbShare').innerHTML = '<a href="http://www.facebook.com/sharer.php?u='+linkPath+'&src=sp" target="_blank"><img src="images/icon_fb.png"  style="width: 30px !important" alt=""> Facebook</a>';

		$('#selectSocial').animate({ bottom: "0" }, "slow");
	});
	//�������� ����� � �������
	$('.mediaContainer').on('click', '.mtmSocialVid', function () {
		//freezePage();
		var videoPath = $(this).parent().children('.playVideoLink').attr('path');
		var videoName = videoPath.replace("media/", "");
		$.get("modules/loadVideoOnServer.php", {
			videoPath: videoPath,
			videoName: videoName
		});
		//VK
		document.getElementById('vkShare').innerHTML = VK.Share.button({
			url: 'http://video.delay-play.com/index.php?item='+videoName.substring(0,videoName.lastIndexOf('.')),
			title: 'DelayPlay - ������� �����-�����������',
			description: '�������� ��� �����, ���������� � ������� ����� �����-����������� DelayPlay!',
			image: "http://video.delay-play.com/logo.png",
			noparse: false
		},{
			type: 'link',
			text: '<img src="images/icon_vk.png" width="25px" alt="" style="width: 30px !important"> ���������'
		});

		//FB
		var linkPath = 'http://video.delay-play.com/index.php?item=' + videoName.substring(0,videoName.lastIndexOf('.'));
		linkPath = encodeURIComponent(linkPath);
		document.getElementById('fbShare').innerHTML = '<a href="http://www.facebook.com/sharer.php?u='+linkPath+'&src=sp" target="_blank"><img src="images/icon_fb.png"  style="width: 30px !important" alt=""> Facebook</a>';

		$('#selectSocial').animate({ bottom: "0" }, "slow");
	});
	//�������� ����� ������ ���������� ����� ��� ���������� ����
	$('.closeSelectSocial').click(function(){
		$('#selectSocial').animate({ bottom: "-248" }, "slow");
	});
});