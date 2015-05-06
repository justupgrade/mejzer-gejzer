<?php
	session_start();
	require_once "../classes/User.php";
	
	if($_SERVER['REQUEST_METHOD'] === 'POST') {
	if(isset($_POST['SubmitLoginBtn']) && isset($_POST['email']) && isset($_POST['password'])){
		require_once '../includes/connection.php';
			
		$username = $conn->real_escape_string($_POST['email']);
		$password = $conn->real_escape_string($_POST['password']);
			
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
					$admin = new User($row['id'], $row['email'], $row['username']);
				}
			}
		}
			
		if($admin){
			$_SESSION['user'] = null;
			$_SESSION['admin'] = $admin;

			header('Location: generator.php');
			die();
		}
	}
}



?>
<section class='default-style' id='login-form'>
	<form method='post'>
		<p><strong>Login</strong></p>
		<div class='form-feedback' id='login-form-feedback'></div>
		<div class='login-input'>
			<div>Email</div>
			<input type='text' name='email' id='emailID' placeholder='email@host.com' required>
			<div class='field-info' id='login-info'></div>
		</div>
		<div class='login-input'>
			<div>Password</div>
			<input type='password' name='password' id='passwordID' placeholder='password' required>
			<div class='field-info' id='password-info'></div>
		</div>
		<input class='blue-blue-style' type='submit' name='SubmitLoginBtn' id='loginFormBtn' value='Login'>
	</form>
</section>
