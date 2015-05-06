<?php
	require_once "../classes/User.php";
	session_start();

	if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['loginBtn']) && 1 === 0) {
		require_once './../includes/connection.php';
		$username = $conn->real_escape_string($_POST['username']);
		$password = $conn->real_escape_string($_POST['password']);

		$query = "SELECT id,password FROM users WHERE name='{$username}' ";
		$query .= " || email='{$username} ";

		$result=$conn->query($query);
		if(!$result) echo "Error: " . $conn->error;
		else {
			if($result->num_rows>0) {
				//username found
			} else {
				//no such user...
				//redirect back with error?
			}
		}

	} elseif($_SERVER['REQUEST_METHOD'] === 'GET') {
		$out = generateErrorMsg();
		require_once './../includes/connection.php';

		if(isset($_GET['username']) && isset($_GET['password'])) {
			$username =  $conn->real_escape_string($_GET['username']); //sanatize once again (after javascript)
			$password =  $conn->real_escape_string($_GET['password']);

			$query = "SELECT * FROM users WHERE username='" . $username . "'";
			$query .= " OR email='".$username ."'";

			$result=$conn->query($query);
			if(!$result) $out['message'] = "Error: " . $conn->error;
			else {
				if($result->num_rows>0) {
					//username found -> compare passwords...
					$row = $result->fetch_array(MYSQLI_ASSOC);
					$hashed = $row['password'];

					if(password_verify($password,$hashed)) {
						//create user...
						$_SESSION['user'] = new User($row['id'], $row['email'], $row['username']);
						$out = generateSuccessMsg();
					}
				}
			}
		}
		

		echo json_encode($out);
	}
	else {
		//header("Location: http://post-o-quot.com/");
	}

	function generateErrorMsg() {
		return array (
			"status" => "error", 
			"message" => "Invalid username/password. Try again..."
		);
	}

	function generateSuccessMsg() {
		return array (
			"status" => "success", 
			"message" => "Success! Logged In!"
		);
	}
?>