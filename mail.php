<?php

$method = $_SERVER['REQUEST_METHOD'];

if ($method != 'POST') {
	exit();
} elseif ( count($_POST) > 4 || !isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["subject"]) || $_POST["message"] =='' ) {
	$request = "Внимание!\r Корректно заполните все поля формы!";
	print($request);
	exit();
} elseif ( ( strlen($_POST["name"]) > 100 ) || ( strlen($_POST["email"]) > 100 ) || ( strlen($_POST["subject"]) > 100 ) || ( strlen($_POST["message"]) > 500 ) ) {
	$request = "Внимание!\r Корректно заполните все поля формы!";
	print($request);
	exit();
} else {

	ini_set('date.timezone', 'Europe/Kaliningrad');

	require_once('phpmailer/PHPMailerAutoload.php');
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';

	$mail->isSMTP();
	$mail->Host = 'smtp.yandex.ru';
	$mail->SMTPAuth = true;
	$mail->Username = 'p.ivanov@infiframe.net';
	$mail->Password = '14881315';
	$mail->SMTPSecure = 'ssl';
	$mail->Port = 465;

	$mail->setFrom('p.ivanov@infiframe.net');
	$mail->addAddress('p.ivanov@infiframe.net');
	$mail->addAddress('uk.i.c.k.e.ru@gmail.com');
	$mail->isHTML(true);

	$mail->Subject = "Обратная связь (портфолио)";

	$name = $_POST['name'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];

	$mail_message = "<h4>Сообщение от:</h4>";
		$mail_message .= "<p>$name, <$email></p>";
	$mail_message .= "<h4>Тема:</h4>";
		$mail_message .= "<p>$subject</p>";
	$mail_message .= "<h4>Сообщение:</h4>";
		$mail_message .= "<p>$message</p>";

	function adopt($text) {
		return '=?UTF-8?B?'.Base64_encode($text).'?=';
	}

	$mail->Body = $mail_message;

	if(!$mail->send()) {
		$request = "Возникла ошибка отправки письма на стороне сервера.\r Пожалуйста, свяжитесь со мной любым другим способом.\r Email: uk.i.c.k.e.ru@gmail.com";
	}

	print_r($request);

	}

?>
