<?php
	require_once "../classes/User.php";
	session_start();
	
	$user = $_SESSION['user'];
	$filename = "data".$user->lastGame;
	
	$path = "../data/games/".$user->getUsername()."/";
	
	//load player data
	echo file_get_contents($path.$filename);
?>