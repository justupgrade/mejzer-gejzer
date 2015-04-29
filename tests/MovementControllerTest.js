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

MovementControllerTest.prototype.setUp = function() {
	tilesize = 30;
	controller = new MovementController();
	map = new Map(new MapFactory());
	controller.SetMap(map);
	
	var rawMapData =
	{
		    "levels": [
		               [
		                   [2,2,2,2,1,2,2,2,2,2,2,2,2,2],
		                   [2,0,0,0,0,3,5,2,4,0,0,0,0,1],
		                   [2,3,2,2,2,2,2,2,2,3,2,2,2,2],
		                   [2,0,0,0,0,2,5,3,0,0,0,3,0,2],
		                   [2,2,2,2,0,2,2,2,0,2,0,2,0,2],
		                   [1,0,4,2,0,3,0,0,0,2,0,2,0,2],
		                   [2,0,2,2,0,2,2,2,2,2,0,2,0,2],
		                   [2,0,3,0,0,2,5,3,0,0,0,2,0,2],
		                   [2,2,2,2,2,2,2,2,2,2,2,2,1,2]
		               ]
		           ]
	};
	
	map.ParseMap(rawMapData['levels'][0]);
}

//test good action taken :: overall test
MovementControllerTest.prototype.testActionOnTile = function() {
	
}

MovementControllerTest.prototype.testActionFloor = function() {
	
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