<?php
	session_start();

	function __autoload($name) {
		include_once "./../classes/" . $name . ".php";
	}

	if($_SERVER['REQUEST_METHOD'] === 'GET') {
		if(isset($_SESSION['user'])){
			$user = $_SESSION['user'];
			if(isset($_GET['password'])) {
				$password = $_GET['password'];
				$valid = DatabaseManager::getInstance()->isValidPassword($user->getID(),$password);
				if($valid){
					echo "Success";
					die();
				} 
			}
		} 
	} 

	echo "Error";
?>