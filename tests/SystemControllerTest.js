/**
 * 
 */

var SysControlTest = new TestCase('SysControlTest');

SysControlTest.prototype.setUp = function() {
	var data = new GameData();
	raw = data.rawMapData;
	controller = new SystemController();
	controller.ParseSystem(raw['system']);
}

//updates map, so:
//it properly displays number of gates (== number of connections)
//it properly sets player position (depends on gate ...)
SysControlTest.prototype.testUpdateMap = function() {
	//if maze is null -> rand new maze -> update -> save it in profile
	//if maze is not null -> use it
	var map = new Map(new MapFactory());
	map.ParseNpcs(raw['npcs']);
	map.ParseMonsters(raw['monsters']);
	map.ParseMap(raw['room']);
	
	var system = controller.getStartingSystem();
	var updatedMap = controller.updateGates(system,map); //changes gates to walls if neccessary
	assertNotNull(updatedMap);
	assertEquals(1, map.GetGates().length);
}

SysControlTest.prototype.testRemoveGate = function() {
	var map = new Map(new MapFactory());
	map.ParseNpcs(raw['npcs']);
	map.ParseMonsters(raw['monsters']);
	map.ParseMap(raw['room']);
	
	var system = controller.getStartingSystem();
	var result = controller.getGateDescriptor(map,"top");
	//jstestdriver.console.log(result.key, result.value);
	map.RemoveGate(result);
	assertEquals(3,map.GetGates().length);
}

//get connections to adjacent rooms (if they exists!)
SysControlTest.prototype.testConnectionFromStart = function() {
	var startingSystem = controller.getStartingSystem();
	assertNotNull(startingSystem);
	//jstestdriver.console.log(startingSystem.col,startingSystem.row); //col=3, row=0
	//connected to 3,1,room
	var connections = controller.getConnections(startingSystem);
	assertEquals(1,connections.length);
	var connection = connections[0];
	var key = Object.keys(connection)[0];
	assertEquals("bottom", key);
	
	//get connections of previous connection...
	var connections = controller.getConnections(connection[key]);
	assertEquals(2,connections.length);
	//first connection is top ? second bottom?
}

SysControlTest.prototype.testDataLoaded = function() {
	assertNotNull(controller.rooms);
}