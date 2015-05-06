<?php

	function __autoload($name) {
		include_once "./../classes/" . $name . ".php";
	}

	if($_SERVER['REQUEST_METHOD'] === 'POST') {
		$username = $_POST['username'];
		$email = $_POST['email'];
		$pass1 = $_POST['pass1'];
		$pass2 = $_POST['pass2'];

		//USERNAME OR EMAIL HAS TO BE VALID! 
		$validator = new InputValidator();
		
		
		if(!$validator->checkUsername($username)) {
			echo InputValidator::StaticResponse(array("status"=>"Error", "problemMsg"=>"Username. Try again."));
			die();
		}
		if(!$validator->checkPasswords($pass1,$pass2)){
			echo InputValidator::StaticResponse(array("status"=>"Error", "problemMsg"=>"Password. Try again."));
			die();
		} 

		//everything ok: add account to db...
		$user_id = DatabaseManager::getInstance()->createAccount($username,$email,$pass1); // -1 -> error OR user_id >= 0 -> success

		if($user_id >= 0){
			echo InputValidator::StaticResponse(array("status"=>"Success"));
		} 
		else{
			echo InputValidator::StaticResponse(array("status"=>"Error", "problemMsg"=>"Unknown error. Try again."));
		} 
	} else {
		echo "Not from post! redirect!";
		die();
	}

	

	
	
?>