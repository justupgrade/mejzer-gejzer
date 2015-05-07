<?php
	require_once "../classes/Admin.php";
	session_start();
	$admin = null;
	if(isset($_SESSION['admin'])) {
		$admin = $_SESSION['admin'];
		header('Location: generator.php');
	} else {
		header('Location: panel.php');
	}
?>