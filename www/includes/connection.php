<?php
	$host = "localhost";
	$db_user = "justupgrade";
	$db_pass = "test";
	$db = "mejzer_gejzer";

	$conn = new mysqli($host, $db_user, $db_pass, $db);
	if($conn->connect_error) echo "Connection error: " . $conn->connect_error;
?>