<?php
	//передаем снимок по FTP
	require_once('webconfig.php');

	global $ftper;

	$videoPath = $_GET['videoPath'];
	$videoName = $_GET['videoName'];

	$ftp = ftp_connect($ftper['host'], $ftper['port'], $ftper['timeout']); // Создаём идентификатор соединения (адрес хоста, порт, таймаут)
	$login = ftp_login($ftp, $ftper['login'], $ftper['password']); // Авторизуемся на FTP-сервере

	if(!$login){
		echo "Ошибка, подключение по FPT не установлено<br>";
	}

	$result = ftp_chdir($ftp, $ftper['videoPath']); // Заходим в созданную директорию
	if(!$result){
		echo "Ошибка, не удалось зайти в папку для закачки по FTP<br>";
	}

	//проверяем, есть ли файл на сервере
    $path = $ftper['videoPath'];
    $file = $videoName;
    $check_file_exist = $videoName; //combine string for easy use
    $contents_on_server = ftp_nlist($ftp, '.'); //Returns an array of filenames from the specified directory on success or FALSE on error. 

    $fileExists = 0;
	// ищем файл в списке
    if (in_array($check_file_exist, $contents_on_server)) 
    {
    	$fileExists = 1;
    }
    if($fileExists == 0){
		$result = ftp_put($ftp, $videoName, $_SERVER['DOCUMENT_ROOT'].'/'.$videoPath, FTP_BINARY); // Загружаем image.bmp на FTP в бинарном режиме
		if(!$result){
			echo "Ошибка, не удалось закачать файл на FTP сервер<br>";
		}
	}
?>