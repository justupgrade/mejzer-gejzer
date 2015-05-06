<?php
	$host = "localhost";
	$db_user = "justupgrade";
	$db_pass = "test";
	$db = "twitter_clone";

	$conn = new mysqli($host, $db_user, $db_pass, $db);
	if($conn->connect_error) echo "Connection error: " . $conn->connect_error;
?>