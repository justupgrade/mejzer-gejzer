<nav>
	<div class='nav-style orange-white-style'>Home</div>
	<div class='nav-style orange-white-style'>Ranking</div>
	<?php 
		if($user !== null) {
			echo "<div class='nav-style orange-white-style'>New Game</div>";
			echo "<div class='nav-style orange-white-style'>Load Game</div>";
			echo "<div class='nav-style orange-white-style'>Settings</div>";
			echo "<div id='logout-id' class='nav-style blue-blue-style'>Logout</div>";
		} else {
			echo "<div id='login-id' class='nav-style blue-blue-style'>Login</div>";
			echo "<div id='create-account-id' class='nav-style green-green-style'>Create Account</div>";
		}
	?>
</nav>
<script>
//add listeners to nav...
	var menus = document.querySelectorAll('.nav-style');
	
	var i;
	
	for(i =0; i < menus.length; i++) {
		if(menus[i].innerHTML == 'Login' || menus[i].innerHTML == 'Create Account') {
			menus[i].addEventListener('click', onLoginClick);
		} else {
			menus[i].addEventListener('click', onMenuItemClick);
		}
	}

	function onMenuItemClick(e) {
		var menuName = e.target.innerHTML.toLowerCase();

		if(menuName == 'home') menuName = 'index';
		else if(menuName == 'new game') menuName = 'new_game';
		else if(menuName == 'load game') menuName = 'load_game';

		window.location.href = menuName + ".php";
	}

	function onLoginClick(e) {
		window.location.href = "login.php";
	}
</script>
