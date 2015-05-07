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
	$loadedLvl = 0;
	
	if($_SERVER['REQUEST_METHOD'] === 'POST') {
		if(isset($_POST['loadBtn'])) {
			$lvlToLoad = $_POST['lvlToLoadId'];
			$pathToFile = "../data/maps/lvl".$lvlToLoad.".json";
			if(file_exists($pathToFile)){
				$raw = json_decode(file_get_contents($pathToFile),true);
				$map = Map::ParseFromRaw($raw);
				$map->lvl = $lvlToLoad;
				$_SESSION['map'] = $map;
				
				//var_dump($map);
			} else {
				echo "<strong style='color:red'>Lvl doesn't exist!</strong>";
			}
		}
		elseif(isset($_POST['cols']) && isset($_POST['rows'])) {
			if(isset($_POST['refreshBtn'])) {
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
		$loadedLvl = $map->lvl;
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
		<input type='submit' id='refreshID' name='refreshBtn' value='refresh'> <br>
<?php 
	//select lvl to load...
?>
		<input type='number' id='lvlToLoadId' name='lvlToLoadId' min='0' max='20' value='<?php echo $loadedLvl; ?>'> 
		<input type='submit' id='loadID' name='loadBtn' value='load'>
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




