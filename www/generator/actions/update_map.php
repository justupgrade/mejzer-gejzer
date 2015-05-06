<?php
	require_once '../Map.php';
	session_start();
	
	$map = $_SESSION['map'];
	
	$id = $_POST['id'];
	$data = explode("id", $id);
	
	$col = intval($data[1]);
	$row =  intval($data[2]);
	$type = intval($_POST['type']);
	
	if($col !== 0 && $col !== $map->getLastCol() && $row !== 0 && $col !== $map->getLastRow()){
		$map->update($col,$row,$type);
		echo "updated";
		die();
	}
	
	echo "not updated";
?>