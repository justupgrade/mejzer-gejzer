<section class='default-style' id='login-form'>
	<form action='./actions/login.php' method='post'>
		<p><strong>Login</strong></p>
		<div class='form-feedback' id='login-form-feedback'></div>
		<div class='login-input'>
			<div>Username</div>
			<input type='text' name='username' id='usernameID' placeholder='username' required>
			<div class='field-info' id='login-info'></div>
		</div>
		<div class='login-input'>
			<div>Password</div>
			<input type='password' name='password' id='passwordID' placeholder='password' required>
			<div class='field-info' id='password-info'></div>
		</div>
		<input class='blue-blue-style' type='submit' name='loginBtn' id='loginFormBtn' value='Login'>
	</form>
</section>

<script>
	var login_btn = document.getElementById('loginFormBtn');
	login_btn.addEventListener('click', onFormLoginBtnClick);

	function onFormLoginBtnClick(e) {
		var formFeedback = document.getElementById('login-form-feedback');
		var usernameInput = document.getElementById('usernameID');
		var passwordInput = document.getElementById('passwordID');

		var usernameStr = (usernameInput.value).replace(/['" ,;?&]/g, ""); //remove all special chars
		var passwordStr = (passwordInput.value).replace(/['" ,;?&]/g, "");; //remove all special chars

		e.preventDefault();

		if(usernameStr.length < 4 || passwordStr.length < 4) {
			formFeedback.innerHTML = "Invalid data! Try again.";
		} else {
			var urlRequest = './actions/login.php?username='+usernameStr+'&password='+passwordStr;

			var xhr = new XMLHttpRequest();
			xhr.open('GET', urlRequest, true);
			xhr.send();

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4) {
					var response = JSON.parse(xhr.responseText);
					if(response.status.toLowerCase() == "error") {
						formFeedback.innerHTML = response.message;
					} else if(response.status.toLowerCase() == "success") {
						//login! redirect...
						formFeedback.innerHTML = response.message;
						window.location.href = "index.php";
					}
				}
			};
		}
	}
</script>