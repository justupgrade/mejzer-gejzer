<?php
	//load generator files
	function __autoload($name){
		require_once '../gate_system/' . $name . '.php';
	}
	
	$system = new System();
	$system->generate();
	
	$path = "../data/games/user/";
	$data = json_encode($system->serializeSystem());
	
	if(!is_dir($path)) mkdir($path,0777,true);
	file_put_contents($path."game.json",$data);
	
	echo $data;
?>