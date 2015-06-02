<?
	//авторизация
	$loginName = 'admin';
	$loginPass = 'admin';

	//путь к json файлу
	$jsonPath = $_SERVER['DOCUMENT_ROOT'].'/modules/appconfig.json';
	$configStr = file_get_contents($jsonPath);

	//объект с настройками
	$config = json_decode($configStr);

	if(isset($_GET['action'])){
		$action = $_GET['action'];

		if($action == 'getConfig'){
			echo $configStr;
			exit();
		}elseif($action == 'setConfig'){
			$data = $_POST;
			$dataStr = json_encode($data);
			if(file_put_contents($jsonPath, $dataStr) === FALSE)
				echo "ERROR";
			exit();
		}
	}
?>
<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8" />
			<title>Delay-Play Configuration Page</title>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

			<link rel="stylesheet" href="css/dp.css" />
			<link rel="stylesheet" href="css/admin.css" />
			<link rel="stylesheet" type="text/css" href="extras/bootstrap3/css/bootstrap.css">
			<link rel="stylesheet" type="text/css" href="extras/jqueryUI/jquery-ui.css">

			<script type="text/javascript" src="js/jquery-latest.js"></script>
			<script type="text/javascript" src="extras/bootstrap3/js/bootstrap.js"></script>
			<script type="text/javascript" src="js/jquery-ui.js"></script>
			<!--[if IE]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
			<![endif]-->
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1><span class="blue">D</span>elay-<span class="blue">P</span>lay <span class="blue">C</span>onfig</h1>
				</div>	
				<!--                                       -->
				<h4>Publish mode</h4>
				<select class="form-control" id="confPublishMode">
					<option value="User">User</option>
					<option value="Group">Group</option>
				</select>	
				<!--                                       -->
				<h4>Language</h4>
				<select class="form-control" id="confLanguage">
					<option value="English">English</option>
					<option value="Russian">Russian</option>
				</select>
				<!--                                       -->
				<h4>Photo delay: <span id="photoDelayValue">	</span> sec</h4>
				<div id="photoDelaySlider">
					
				</div>
				<script>
					$(document).ready(function(){
						$("#photoDelaySlider" ).slider({
                           	range: "max",
                           	min: 0,
                           	max: 10,
                           	value: 3,
                           	slide: function( event, ui ) {
                            	$("#photoDelayValue").html( ui.value );
                           	}        
                        });   
					});
				</script>
				<!--                                    -->   
				<br>
				<div class="header">
					<h1><span class="blue">G</span>roup <span class="blue">P</span>ublish <span class="blue">C</span>onfigs</h1>
				</div>
				<!--                                    -->   
				<h4>VK User Id</h4>
				<input type="text" class="form-control" id="confPubVKUser"></input>
				<!--                                    -->   
				<h4>VK User Token</h4>
				<input type="text" class="form-control" id="confPubVKToken"></input>
				<!--                                    -->   
				<h4>FB User Id</h4>
				<input type="text" class="form-control" id="confPubFBUser"></input>
				<!--                                    -->   
				<h4>FB User Token</h4>
				<input type="text" class="form-control" id="confPubFBToken"></input>
				<!--                                    -->  
				<button class="btn" id="save">Save</button>
			</div>	
			<script>
				$(document).ready(function(){
					$.ajax({
					  	url: "admin.php?action=getConfig"
					}).done(function(data){
						data = JSON.parse(data);

						$('#confPublishMode').val(data.publishMode);
					  	$('#confLanguage').val(data.lang);

					  	$('#photoDelayValue').html(data.photoDelay);
					  	$("#photoDelaySlider" ).slider('value', data.photoDelay);

					  	$('#confPubVKUser').val(data.vkUser);
					  	$('#confPubVKToken').val(data.vkToken);
					  	$('#confPubFBUser').val(data.fbUser);
					  	$('#confPubFBToken').val(data.fbToken);
					});

					$('#save').click(function(){
						setConfig();
					});
				});

				function setConfig(){
					var publishMode = $('#confPublishMode').val();
					var lang = $('#confLanguage').val();
					var photoDelay = $("#photoDelaySlider" ).slider('value');

					var vkUser = $('#confPubVKUser').val();
					var vkToken = $('#confPubVKToken').val();
					var fbUser = $('#confPubFBUser').val();
					var fbToken = $('#confPubFBToken').val();

					$.post("admin.php?action=setConfig", { 
						publishMode: publishMode, 
						lang: lang,
						photoDelay: photoDelay,
						vkUser: vkUser,
						vkToken: vkToken,
						fbUser: fbUser,
						fbToken, fbToken
					}).done(function(){
						alert("SAVED");
					});
				}
			</script>		
		</body>
	</html>