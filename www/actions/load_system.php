<?php
	require_once "../classes/User.php";
	session_start();
	
	$user = $_SESSION['user'];
	$filename = $user->lastGame;
	
	$path = "../data/games/".$user->getUsername()."/";
	
	//load map data
	echo file_get_contents($path.$filename);
?>