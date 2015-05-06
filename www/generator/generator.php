<?php
	//header('Content-type: text/html; charset=utf-8');
	//only for admin
	require_once 'Map.php';
	
	session_start();
?>
<?php
	$cols = 14;
	$rows = 9;
	$monsterLVL = 1;
	
	if($_SERVER['REQUEST_METHOD'] === 'POST') {
		if(isset($_POST['cols']) && isset($_POST['rows'])) {
			if(isset($_POST['loadBtn'])) {
				if(isset($_SESSION['map'])) {
					$map = $_SESSION['map'];
				}
			} else if(isset($_POST['saveBtn'])) {
				$map = $_SESSION['map'];
				$map->save();
			}
			else {
				$cols = $_POST['cols'];
				$rows = $_POST['rows'];
				$monsterLVL = $_POST['monsterLvl'];
					
				$map = new Map($cols,$rows,$monsterLVL);
				$map->generate();
				
				$_SESSION['map'] = $map;
			}
			
		}
	}
	
	if(isset($map)){
		$cols = $map->GetWidth();
		$rows = $map->GetHeight();
		$monsterLVL = $map->GetMonsterLvl();
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>Generator</title>
	<style> @import url('styles/generator.css'); </style>
</head>
<body>
	<form method='post' action=''>
		Cols: <input min='8' max='20' type='number' name='cols' value='<?php echo $cols; ?>'> 
		Rows: <input min='8' max='15' type='number' name='rows' value='<?php echo $rows; ?>'> 
		Monster lvl: <input min='1' type='number' name='monsterLvl' value='<?php echo $monsterLVL; ?>'>
		<input type='submit' id='generateID' name='generateBtn' value='generate'>
		<input type='submit' id='generateID' name='loadBtn' value='load'>
<?php if(isset($map)) {?><input type='submit' id='saveID' name='saveBtn' value='save'> <?php } ?>
	</form>
<hr>
<?php 
	if(isset($map)){
?>
	<div class='block-options'>
		<div class='map-cell type0 option' id='0'></div>
		<div class='map-cell type2 option' id='2'></div>
		<div class='map-cell type3 option' id='3'></div>
		<div class='map-cell type4 option' id='4'></div>
		<div class='map-cell type5 option' id='5'></div>
	</div>
<hr>
<?php
		echo $map->getHtml();
?>
<!--  MONSTER FORM -->
<?php
	}
?>
<hr>
<script type="text/javascript" src="js/generator.js"></script>
</body>
</html>




