<?php
//echo 1;
	//include('config.php');

	// Читаем настройки config
	require_once('webconfig.php');

	// Подключаем класс FreakMailer
	require_once('mailer.php');

	global $ftper;

	$name = $_GET['senderName'];
	$email = $_GET['recieverEmail'];
	$comment = $_GET['mailComment'];

	$photos = $_GET['photos'];
	$videos = $_GET['videos'];

	$photos = json_decode($photos);
	$videos = json_decode($videos);

	//проверяем видео
	$ftp = ftp_connect($ftper['host'], $ftper['port'], $ftper['timeout']); // Создаём идентификатор соединения (адрес хоста, порт, таймаут)
	$login = ftp_login($ftp, $ftper['login'], $ftper['password']); // Авторизуемся на FTP-сервере

	if(!$login){
		echo "Ошибка, подключение по FPT не установлено<br>";
		return;
	}

	$result = ftp_chdir($ftp, $ftper['videoPath']); // Заходим в созданную директорию
	if(!$result){
		echo "Ошибка, не удалось зайти в папку для закачки по FTP<br>";
		return;
	}

	for($i=0; $i<count($videos); $i++){
		//проверяем, есть ли файл на сервере
	    $path = $ftper['videoPath'];
	    $file = $_SERVER['DOCUMENT_ROOT'].'/'.$videos[$i];

	    $contents_on_server = ftp_nlist($ftp, '.'); //Returns an array of filenames from the specified directory on success or FALSE on error. 
	    $fileExists = 0;

		// ищем файл в списке
	    if (in_array(basename($videos[$i]), $contents_on_server)) {
	    	$fileExists = 1;
	    }else{
	    	$result = ftp_put($ftp, basename($videos[$i]), $file, FTP_BINARY); // Загружаем image.bmp на FTP в бинарном режиме
			if(!$result){
				echo "Ошибка, не удалось закачать файл на FTP сервер<br>";
			}
	    }
	}

	ftp_close($ftp);

	//проверяем фото

	// инициализируем класс
	$mailer = new DPMailer();
	$mailer->IsSMTP();

	$mailer->CharSet 	= $mail['charset'];
	$mailer->SMTPDebug  = $mail['smtp_debug'];
	$mailer->Host 		= $mail['smtp_host'];
	$mailer->SMTPAuth   = $mail['smtp_auth'];
	$mailer->Port       = $mail['smtp_port'];
	$mailer->FromName 	= $mail['from_name'];
	$mailer->Username   = $mail['smtp_username'];
	$mailer->Password   = $mail['password'];
	$mailer->CharSet 	= $mail['charset'];
	$mailer->SetFrom($mail['from_email'], $mail['from_name']);

	$mailer->IsHTML(true);
	// Устанавливаем тему письма
	$mailer->Subject = "Ваш друг ".$name." прислал вам сообщение через систему DelayPlay";

	// Задаем тело письма
	$bodyString = "Здравствуйте, Ваш друг ".$name." прислал вам сообщение через систему DelayPlay.<br>";
	$bodyString .= "Ссылки: <br>";
	for($i=0; $i<count($videos); $i++){
		$bodyString .= "<a target='_blank' href='".$ftper['videoLinkPath'].basename($videos[$i])."'>".$ftper['videoLinkPath'].basename($videos[$i])."</a> <br>";
	}
	$bodyString .= "Комментарий к письму: <br>".$comment;
	$mailer->Body = $bodyString;

	//прикрепляем фото
	for($i=0; $i<count($photos); $i++){
		$mailer->AddAttachment($_SERVER['DOCUMENT_ROOT'].'/'.$photos[$i], basename($photos[$i]));
	}
	
	// Добавляем адрес в список получателей
	$mailer->AddAddress($email);

	if($mailer->Send()){
	  echo 1;
	}

	$mailer->ClearAddresses();
	$mailer->ClearAttachments();
	$mailer->SmtpClose();

?>