<?php 
	require_once "classes/User.php";
	session_start();
	
	$user = null;
	if(!isset($_SESSION['user'])) {
		//header('Location: login.php');
	} else {
		$user = $_SESSION['user'];
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<style> @import url('styles/main.css'); </style>
	<style> @import url('styles/user.css'); </style>
</head>
<body>
<?php
	include_once 'includes/nav.php';
	include_once 'includes/login.php';
	include_once 'includes/create_account.php';
?>
</body>
</html>
