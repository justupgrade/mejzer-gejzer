<section class='default-style' id='create-account-form'>
	<form method='post' action='./actions/create_account.php'>
		<p><strong> Create Account</strong> </p>
		<div class='form-feedback' id='create-account-form-feedback'></div>
		<div class='login-input'>
			<div>Username</div>
			<input type='text' name='username' id='create-usernameID' placeholder='username'>
			<div class='field-info' id='create-account-username-info'></div>
		</div>
		<div class='login-input'>
			<div>Password</div>
			<input type='password' name='pass1' id='create-passwordID' placeholder='password' required>
			<div class='field-info' id='create-account-password-info'></div>
		</div>
		<div class='login-input'>
			<div>Password</div>
			<input type='password' name='pass2' id='repeat-passwordID' placeholder='password' required>
			<div class='field-info' id='repeat-password-info'></div>
		</div>
		<input class='green-green-style' type='submit' name='createBtn' id='createFormBtn' value='Create Account'>
	</form>
</section>

<script>
	//add listener to createAccountBtn
	//check if username or email is filled
	//check if username or email is unique
	//check if passwords are the same

	var usernameIsCorrect = false;
	var emailIsCorrect = false;
	var passwordIsCorrect = false;

	var _username = null;
	var _pass1 = null;
	var _pass2 = null;
	var _email = null;

	var createAccountBtn = document.getElementById('createFormBtn');
	createAccountBtn.addEventListener('click', createAccountHandler);

	var usernameInputEl = document.getElementById('create-usernameID');
	usernameInputEl.addEventListener('input', onUsernameInputHandler);

	var firstPassword = document.getElementById('create-passwordID');
	firstPassword.addEventListener('input', validateFirstPass);

	var repeatedPassword = document.getElementById('repeat-passwordID');
	repeatedPassword.addEventListener('input', validateRepeatedPass);

	//------------------------ EVENT HANDLERS -------------------------------

	function validateFirstPass(e) {
		//4 chars long? not null etc...
		var str = firstPassword.value;
		if(!hasAcceptableForm(str)) {
			displayInfoMsg('create-account-password-info','Invalid (too short!)');
		} else {
			displayInfoMsg('create-account-password-info','Valid password.');
		}

		validateRepeatedPass(null);
	}

	function validateRepeatedPass(e) {
		var pass1 = firstPassword.value;
		var pass2 = repeatedPassword.value;

		if(hasAcceptableForm(pass2)) {
			passwordIsCorrect = false;
			if(pass1 !== undefined && pass1 !== null) {
				if(pass1 !== pass2) displayInfoMsg('repeat-password-info','Error: passwords are not the same.');
				else{
					displayInfoMsg('repeat-password-info','Passwords are OK.');
					passwordIsCorrect = true;
					_pass1 = pass1; _pass2 = pass2;
				} 
			}
		}
		
	}

	function onUsernameInputHandler(e) {
		usernameIsCorrect = false;
		var str = usernameInputEl.value;
		if(isValidString(str)) {
			isUnique(str,'username');
		} else {
			displayInfoMsg('create-account-username-info','invalid');
		}
	}

	//------------------- SUBMIT HANDLER ----------------------------

	function createAccountHandler(e) {
		var error = false;
		var warning = false;
		var problem = "";

		if(!usernameIsCorrect){
			displayErrorMsg('ERROR: username has to be correct!');
			problem = "Invalid Username";
			error = true;
		}


		if(!passwordIsCorrect){
			displayErrorMsg('ERROR password is not valid!');
			error = true;
		}

		e.preventDefault(); //error

		if(warning) { //warning
			var decision = confirm("Create Account (" + problem + ")?");
			if(decision) createAccount();
		} else if(!error) createAccount();

	}

	function createAccount() {
		createAccountBtn.style.display = "none";

		var formdata = new FormData();
		formdata.append('username', _username);
		formdata.append('email', "");
		formdata.append('pass1', _pass1);
		formdata.append('pass2', _pass2);

		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", onCreateAccountCompleted);
		xhr.open('POST', 'actions/create_account.php', true);
		xhr.send(formdata);

	}

	function onCreateAccountCompleted(e) {
		//alert(e.target.responseText);
		var response = JSON.parse(e.target.responseText);

		if(response.status.toLowerCase() === "success") {
			//TODO: append somewhere successfull feedback ? login ?
			alert('Account created successfully! Log In!');
		} else {
			displayErrorMsg("Username Status: " + response.problemMsg);
		}

		createAccountBtn.style.display = "block";
	}

	//------------------------------ AJAX CALLS ----------------------------

	function isUnique(str, column) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', './actions/look_for_unique.php?'+column+"="+str,true);
		xhr.send();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				//alert(xhr.responseText)
				if(xhr.responseText == 'Success') {
					if(column==='username'){
						displayInfoMsg('create-account-username-info','Valid name.');
						usernameIsCorrect = true;
						_username = str;
					} 
					else if(column==='email'){
						displayInfoMsg('create-account-email-info','Valid email.');
						emailIsCorrect = true;
						_email = str;
					} 
				} 
				else {
					if(column==='username') displayInfoMsg('create-account-username-info','Invalid: name already exists...');
					else if(column==='email') displayInfoMsg('create-account-email-info','Invalid: email already exists...');
				}
			}
		}
	}

	//-------------------------------- VALIDATION ------------------------

	function isValidEmail(email) {
		var exclude = /[ ,;?'"<>$&]/;
		var include = /[@.]/;

		return !exclude.test(email) && include.test(email) ? true : false;
	}
	
	//not null & length >= 4 & no special chars & unique
	function isValidString(str) {
		var pattern = /[ ,.;'"?<>$&\\]/;

		return  str !== undefined && str !== null && str.trim().length >= 4 && !pattern.test(str) ? true : false;
	}

	function hasAcceptableForm(str) {
		return str !== undefined && str !== null && str.trim().length >= 4 ? true : false;
	}

	//------------------------ UPDATE INFO/ERROROP LABELS -----------------------

	function displayErrorMsg(msg) {
		var feedbackDiv = document.getElementById('create-account-form-feedback');
		feedbackDiv.innerHTML = msg;
	}

	function displayInfoMsg(elementID, msg) {
		var element = document.getElementById(elementID);
		element.innerHTML =msg;
	}
</script>