<?
	$jsonPath = $_SERVER['DOCUMENT_ROOT'].'/modules/appconfig.json';
   	$configStr = file_get_contents($jsonPath);
   	$appconfig = json_decode($configStr);

	global $language;

	if($appconfig->lang == "English")
		$language = 'en';
	if($appconfig->lang == "Russian")
		$language = 'ru';

	$localizations = f_parseLocalizations($language);

	if($_GET['func'] == 'getLocal'){
		echo json_encode($localizations);
	}

	function f_parseLocalizations($a_lang){
		$dir = $_SERVER['DOCUMENT_ROOT'].'/modules/locals';
		$files = scandir($dir);

		$localExists = array_search($a_lang.'.json', $files);

		if($localExists === FALSE){
			echo 'Localization file not found: '.$a_lang.'.json';
			return FALSE;
		}

		return json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT']."/modules/locals/".$files[$localExists], false));
	}
?>