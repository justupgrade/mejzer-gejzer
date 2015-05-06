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
<html>
<head>
    <title>Game</title>
    <style> @import url('styles/main.css'); </style>
	<style> @import url('styles/user.css'); </style>
</head>
<body>
	<div style='margin: 10px'>
<?php include_once 'includes/nav.php'; ?>
	</div>
	
    <canvas id="canvas" width="800" height="500">
        Canvas not supported.
    </canvas>
    
    <script type="text/javascript" src="./js/MapBlock.js"></script>
    <script type="text/javascript" src="./js/models/Player.js"></script>
    <script type="text/javascript" src="./js/models/Npc.js"></script>
    <script type="text/javascript" src="./js/models/Quest.js"></script>
    <script type="text/javascript" src="./js/models/Item.js"></script>
    <script type="text/javascript" src="./js/models/Inventory.js"></script>
    <script type="text/javascript" src="./js/models/Room.js"></script>
    
    <script type="text/javascript" src="./js/AI/Tile.js"></script>
    <script type="text/javascript" src="./js/AI/Grid.js"></script>
    <script type="text/javascript" src="./js/AI/Pathfinder.js"></script>
    
    <script type="text/javascript" src="./js/controllers/InventoryController.js"></script>
    <script type="text/javascript" src="./js/controllers/MovementController.js"></script>
    <script type="text/javascript" src="./js/controllers/CombatController.js"></script>
    <script type="text/javascript" src="./js/controllers/NpcController.js"></script>
    <script type="text/javascript" src="./js/controllers/QuestController.js"></script>
    <script type="text/javascript" src="./js/controllers/SystemController.js"></script>
    
    <script type="text/javascript" src="./js/controllers/MonsterFactory.js"></script>
    <script type="text/javascript" src="./js/controllers/NpcFactory.js"></script>
    <script type="text/javascript" src="./js/controllers/QuestFactory.js"></script>
    <script type="text/javascript" src="./js/controllers/ItemFactory.js"></script>
    
    <script type="text/javascript" src="./js/views/PlayerGui.js"></script>
    <script type="text/javascript" src="./js/views/GameMenu.js"></script>
    <script type="text/javascript" src="./js/views/StatsMenu.js"></script>
    <script type="text/javascript" src="./js/views/QuestsMenu.js"></script>
    <script type="text/javascript" src="./js/views/WorldMenu.js"></script> 
    <script type="text/javascript" src="./js/views/InventoryMenu.js"></script> 
    <script type="text/javascript" src="./js/views/NpcMenu.js"></script>
    <script type="text/javascript" src="./js/views/PreCombatMenu.js"></script> 
    <script type="text/javascript" src="./js/views/ItemPickedUpMenu.js"></script> 
     
    <script type="text/javascript" src="./js/fsm/ViewMachine.js"></script>
    <script type="text/javascript" src="./js/GameLoader.js"></script>
    <script type="text/javascript" src="./js/Map.js"></script>
    <script type="text/javascript" src="./js/Main.js"></script>
    
    <script type="text/javascript" src="./js/game.js"></script>
</body>
</html>