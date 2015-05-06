<?php
	require_once "../classes/User.php";
	session_start();
	
	$user = $_SESSION['user'];
	
	$stats = $_POST['stats']; //array object
	
	$path = "../data/games/".$user->getUsername()."/";
	$filename = "data".$user->lastGame;
	
	file_put_contents($path.$filename, $stats);
	
	echo "end";
	
?>