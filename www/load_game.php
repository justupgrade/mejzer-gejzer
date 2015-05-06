<?php 
	require_once "classes/User.php";
	session_start();
	
	$user = null;
	if(!isset($_SESSION['user'])) {
		//header('Location: login.php');
	} else {
		$user = $_SESSION['user'];
	}
	
	if($_SERVER['REQUEST_METHOD'] === 'POST') {
		$filename = $_POST['gameToLoadName'];
		$user->lastGame = $filename;
		$_SESSION['user'] = $user;
		header('Location: game.php');
		die();
	}
	
	/*
	 * display player games:
	 * load data from dir
	 * create list of games
	 */
?>
<!DOCTYPE html>
<html>
<head>
	<title>Load Game</title>
	<style> @import url('styles/main.css'); </style>
	<style> @import url('styles/user.css'); </style>
</head>
<body>
<?php include_once 'includes/nav.php'; ?>
<?php 
	$path = "data/games/".$user->getUsername();
	if(!is_dir($path)){
		echo "No games to load...";
	} else {//load...
		$list = array_values(array_diff(scandir($path), array('..', '.')));
		
		
		foreach($list as $filename){
			echo "<form action='' method='post'>";
			echo "<input name='gameToLoadName' type='submit' class='add' style='margin-left: 20px; margin-bottom: 5px' value='".$filename."'>";
			echo "</form>";
		}
		
	}

?>
<script>
	var btns = document.querySelectorAll('.add');
	for(var i=0; i < btns.length; i++) {
		btns[i].addEventListener('click', loadGame);
	}

	function loadGame(e) {
		var gameToLoad = e.target.value;
	//	console.log(gameToLoad);
	}

	
</script>
</body>
</html>