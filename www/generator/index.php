<?php
	require_once "../classes/User.php";
	session_start();
	$admin = null;
	if(isset($_SESSION['admin'])) {
		$admin = $_SESSION['admin'];
	} else {
		header('Location: panel.php');
	}
?>