<?php
	//include("config.php");
	include("webconfig.php");
	require_once('phpmailer/class.phpmailer.php');
	require_once('phpmailer/PHPMailerAutoload.php');

//-----------------------------------------------------------------

	class DPMailer extends PHPMailer{

	    var $priority = 3;
	    var $to_name;
	    var $to_email;
	    var $From = null;
	    var $FromName = null;
	    var $Sender = null;
	  
	    function DPMailer(){

	      global $mailer;
	      
	      // Берем из файла mailerconfig.php массив $mailer
	      
	      if($mailer['smtp_mode'] == 'enabled')
	      {
	        $this->Host = $mailer['smtp_host'];
	        $this->Port = $mailer['smtp_port'];
	        if($mailer['smtp_username'] != '')
	        {
	         $this->SMTPAuth  = true;
	         $this->Username  = $mailer['smtp_username'];
	         $this->Password  =  $mailer['smtp_password'];
	        }
	        $this->Mailer = "smtp";
	      }
	      if(!$this->From)
	      {
	        $this->From = $mailer['from_email'];
	      }
	      if(!$this->FromName)
	      {
	        $this->FromName = $mailer['from_name'];
	      }
	      if(!$this->Sender)
	      {
	        $this->Sender = $mailer['from_email'];
	      }
	      $this->Priority = $this->priority;
	    }
	}
?>