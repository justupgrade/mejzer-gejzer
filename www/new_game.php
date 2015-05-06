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
	<title>New Game</title>
	<style> @import url('styles/main.css'); </style>
	<style> @import url('styles/user.css'); </style>
</head>
<body>
<?php include_once 'includes/nav.php'; ?>
<?php 
	$path = "data/games/".$user->getUsername();
	if(!is_dir($path)){
		mkdir($path,0777,true);
	}
	
	$list = array_values(array_diff(scandir($path), array('..', '.')));
	$totalGamesNum = count($list);
	
	for($i = $totalGamesNum-1; $i >= 0; $i--){
		if(strpos($list[$i], "data") === 0) {
			unset($list[$i]);
		}
	}
	
	$totalGamesNum = count($list);
	
	$newGameName = "game".$totalGamesNum.".json";
?>
<form action='' method='POST'>
	<input type='hidden' id='filenameID' name='gameName' value='<?php echo $newGameName; ?>'>
	<input class='send' type='submit' id='submitID' value='generate new world'>
</form>

<script type="text/javascript">
	var submitBtn = document.getElementById('submitID');
	submitBtn.addEventListener('click', generateNewWorld);
	
	function generateNewWorld(e) {
		e.preventDefault();
		var fileName = document.getElementById('filenameID').value;

		var formdata = new FormData();
		formdata.append('filename', fileName);
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'actions/generate_system.php');
		xhr.addEventListener('load', onGameGeneratedHandler);
		xhr.send(formdata); //send user data in future
	}

	function onGameGeneratedHandler(e) {
		window.location.href = "game.php";
	}
	
</script>
</body>
</html>