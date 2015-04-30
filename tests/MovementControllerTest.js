/**
 * -> player clicks on grid
 * -> pathfinder is executed
 * OPTIONS:
 * 	player clicked on grid (floor)	-> player moves to clicked position
 * 	player clicked on monster (once) -> open monster box
 *  player clicked on monster second time -> go to position, open confirm fight box
 *  player clicked on wall -> nothing happens
 *  player clicked on quest -> open quest dialog (info about entity)
 *  player clicked on quest second tie -> go to position, open dialog box
 *  
 * POSSIBLE ISSUES:
 * (so analyze path after generation)
 *  path to target is blocked by a monster
 *  path to target is blocked by a wall
 */

AsyncTest = new AsyncTestCase('AsyncTest');

AsyncTest.prototype.testAsync = function(queue) {
	/*var map = new Map();
	var response;
	var grid;
	mapLoadedHandler = function(e) {
		response = e.target.responseText;
		jstestdriver.console.log(response);
		map.ParseMap(JSON.parse(response));
	};
	
	queue.call('set up', function(callbacks){
		var callbackWrapper = callbacks.add(mapLoadedHandler);
		
		
		map.Load(0,callbackWrapper);
	});
	
	queue.call('assert', function() {
		assertNotNull(response);
	});*/
}

MovementControllerTest = new TestCase('MovementControllerTest');

MovementControllerTest.prototype.MockCallback = function() {
	
}

MovementControllerTest.prototype.setUp = function() {
	tilesize = 30;
	controller = new MovementController();
	controller.SetCombatCallback(this.MockCallback);
	map = new Map(new MapFactory());
	controller.SetMap(map);
	
	var data = new GameData();
	var rawData = data.rawMapData;
	
	map.ParseNpcs(rawData['npcs']);
	map.ParseMonsters(rawData['monsters']);
	map.ParseMap(rawData['room']);
	
	//jstestdriver.console.log('monster (col,row):' + map.GetMonsters()[0].col + "," +map.GetMonsters()[0].row);
}

/*
 * click on monster ->
 * 	first click -> show monster stats
 *  second click -> find path and start fight
 */
MovementControllerTest.prototype.testClickOnMonster = function() {
	var location = {"COL":11, "ROW":3};
	var monster = controller.getMonster(location);
	//jstestdriver.console.log('monster = ' + monster);
	assertTrue(controller.clickedOnMonster(monster)); //first click
	var path = controller.clickedOnMonster(monster) //second click
	jstestdriver.console.log('path: ' + path);
	for(var idx in path){
		jstestdriver.console.log("cords:" + path[idx].getCol() + ", " + path[idx].getRow());
	}
}

//GRID GENERATION FROM MAP TEST;
MovementControllerTest.prototype.testGridGeneration = function() {
	var grid = new Grid(map.GetHeight(), map.GetWidth());
	grid.generateFromMap(map.GetMap());
	
	var tiles = map.GetMap(); //blocks...
	
	for(var i=0; i < map.GetHeight(); i++) {
		for(var j=0; j < map.GetWidth(); j++){
			//jstestdriver.console.log(tiles[i][j] instanceof Empty);
		}
	}
	
	for(var i=0; i < map.GetHeight(); i++) {
		for(var j=0; j < map.GetWidth(); j++){
			//jstestdriver.console.log(grid.getTile(j,i).isOpen());
		}
	}
	
	
}


//test good action taken :: test movement
MovementControllerTest.prototype.testClickedOnSameTile = function() {
	var start = {"COL":12,"ROW":7};
	var finish = {"COL": 12, "ROW":3};
	
	var tile = controller.getTile(finish);
	
	assertTrue(controller.clickedOnFloor(tile));
	assertNotNull(controller.GetLastSelectedTile());
	controller.clickedOnFloor(tile);
	
	//jstestdriver.console.log('response:' + controller.clickedOnFloor(tile));
	//player position updated?
	//expected == finish
	var actual = controller.GetPlayer().GetCords();
	
	assertEquals(finish,actual);
}

//PATH GENERATIOON TEST!!!
MovementControllerTest.prototype.testGeneratePath = function() {
	var start = {"COL":12,"ROW":7};
	var finish = {"COL": 10, "ROW":3};
	
	var path = controller.generatePath(start,finish);
	
	for(var idx in path) {
		//jstestdriver.console.log(path[idx].getCol() + ", " + path[idx].getRow());
	}
}

//first click -> show path -> second click -> go
MovementControllerTest.prototype.testActionFloor = function() {
	var tile = controller.getTile({"COL":12, "ROW":7}); //player position
	var expected = null;
	
	var actual = controller.clickedOnFloor(tile);
	assertNull(actual);
	assertNull(controller.GetLastSelectedTile());
	//click one tile above player...
	var tile = controller.getTile({"COL":12, "ROW":6});
	
	//expected array
	var path = controller.clickedOnFloor(tile);
	assertNotNull(path);
	
	for(var idx in path) {
		//jstestdriver.console.log(path[idx].getCol() + ", " + path[idx].getRow());
		//full path: start + tiles + finish -> so remember to remove first element
		//Tiles!!! not points or MapBlocks!
	}
	
	//clicked on floor but monster in a way...
	//var tile = controller.getTile({"COL":10, "ROW":3});
	//var path = controller.clickedOnFloor(tile);
	
	for(var idx in path) {
		//jstestdriver.console.log(path[idx].getCol() + ", " + path[idx].getRow());
	}
}

//clicked on nothing -> do nothing -> clear all selections
MovementControllerTest.prototype.testActionWall = function() {
	controller.clickedOnWall();
	
	assertNull(controller.GetLastSelectedTile());
	assertNull(controller.GetLastSelectedMonster());
	assertNull(controller.GetLastSelectedItem());
	assertNull(controller.GetLastSelectedNpc());
	
}

//test if right tile is 'downloaded' from map array
MovementControllerTest.prototype.testGetTile = function() {
	assertNotNull(map.GetMap());
	
	var cords = {"COL":0, "ROW":0};
	
	var expected = new Wall();
	var actual = controller.getTile(cords);
	
	//jstestdriver.console.log(expected instanceof Wall);
	
	assertTrue(expected instanceof Wall);
	assertFalse(expected instanceof Empty);
	
	var cords = {"COL":1, "ROW":2};
	
	var expected = new Monster();
	var actual = controller.getTile(cords);
	
	//jstestdriver.console.log(expected instanceof Wall);
	
	assertTrue(expected instanceof Monster);
}

//test1 -> get COL and ROW of clicked tile
MovementControllerTest.prototype.testCalculateCords = function() {
	var input = [[25,25], [30,30]];
	var expected =  [{"X":0,"Y":0},{"X":1,"Y":1}];
	
	var actual
	var idx;
	for(idx in expected){
		actual = controller.calculateCords(input[idx][0],input[idx][1]);
		assertEquals(expected[idx],actual);
	}
	
	
}