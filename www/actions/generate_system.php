<?php
	require_once "../classes/User.php";
	session_start();
	
	$user = $_SESSION['user'];
	//load generator files
	function __autoload($name){
		require_once '../gate_system/' . $name . '.php';
	}
	
	$filename = $_POST['filename'];
	$user->lastGame = $filename;
	
	$system = new System();
	$system->generate();
	
	$path = "../data/games/".$user->getUsername()."/";
	$data = json_encode($system->serializeSystem());
	
	if(!is_dir($path)) mkdir($path,0777,true);
	file_put_contents($path.$filename,$data);
	
	echo $data;
?>