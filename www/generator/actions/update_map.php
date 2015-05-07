<?php
	require_once '../Map.php';
	session_start();
	
	$map = $_SESSION['map'];
	
	$id = $_POST['id'];
	$data = explode("id", $id);
	
	$col = intval($data[1]);
	$row =  intval($data[2]);
	$type = intval($_POST['type']);
	
	if($col !== 0 && $col !== $map->getLastCol() && $row !== 0 && $row !== $map->getLastRow()){
		$map->update($col,$row,$type);
		$_SESSION['map'] = $map;
		echo "updated col: $col, row: $row";
		die();
	}
	
	echo "not updated col: $col, row: $row";
?>