/**
 * controlls system! =D
 * chooses right map (maze/room) to load
 * chooses right gates to display
 * chooses right player position on map init...
 */

function SystemController() {
	this.rooms = [];//cords of connected rooms
	this.cols = 0;
	this.row = 0;
	this.lastLvlID = 0;
	this.current = null;
	this.entrance = null;
}

SystemController.prototype.setUpNewSystem = function(gate, mapSize) {
	var direction = this.getDirection(gate,mapSize); //left,right,top,bottom
	var connections = this.getConnections(this.current);
	
	//console.log(direction, connections);
	
	var newRoom;
	var idx;
	
	for(idx in connections){
		if(connections[idx][direction]) {
			newRoom = connections[idx][direction];
			break;
		}
	}
	
	this.current = newRoom;
	this.lastLvlID = newRoom.id;
}

SystemController.prototype.getDirection = function(gate,size){
	var direction = null;
	
	//console.log(gate.col,gate.row,size);
	
	if(gate.col == 0){
		direction = "left";
		this.entrance = "right";
	}
	else if(gate.row == 0){
		direction = "top";
		this.entrance = "bottom";
	}
	else if(gate.col == size.cols-1){
		direction ="right";
		this.entrance = "left";
	}
	else if(gate.row == size.rows-1){
		direction = "bottom";
		this.entrance = "top";
	}
	
	return direction;
}

SystemController.prototype.ParseSystem = function(data){
	this.rows = data.length;
	this.cols = data[0].length;
	
	var row, col;
	
	var array;
	for(row = 0; row < this.rows; row++){
		array = [];
		for(col = 0; col < this.cols; col++){
			array.push(data[row][col] == null ? null : new Room(data[row][col]));
		}
		this.rooms.push(array);
	}
}

SystemController.prototype.updatePlayerStartingPosition = function(map) {
	//move player to the entrance (if exists)
	
	if(this.entrance){
		var gate = map.GetGateByDescriptor(this.getGateDescriptor(map,this.entrance));
		var directions = {"left": [0,-1], "right":  [0,1], "top":  [-1,0], "bottom":  [1,0] };
		//reverse directions result!!!
		var change = directions[this.entrance];
		var newRow = gate.row - change[0];
		var newCol = gate.col - change[1];
		
		map.UpdatePlayerPostion({"COL":newCol, "ROW":newRow});
	}
}

/*
 * if system = null -> system controller will somehow(=D) figure out which system
 * to update...
 * very smart code in here :D
 */
//remove gates from map that should not be there...
SystemController.prototype.updateGates = function(system,map) {
	if(system === null) {//magic! -> null arg? no problem! :D
		if(!this.current){ //first load
			system = this.getSystemById(this.lastLvlID, map.GetSize());
			this.current = system;
		} else {
			system = this.current; //override function arg
		}
	}
	
	var connections = this.getConnections(system);

	var directions = [];
	//get directions: connections[{key=>room}]
	for(var idx in connections) for(var key in connections[idx]) directions.push(key);
	var lackingDirections = ["left","right","top","bottom"];
	
	//compare valid directions [in the system] to all directions
	//splice valid directions
	for(var idx in directions) {
		var dirIDX = lackingDirections.indexOf(directions[idx]);
		lackingDirections.splice(dirIDX,1);
	}
	
	//update map...
	for(var idx in lackingDirections){
		var descriptor = this.getGateDescriptor(map,lackingDirections[idx]);
		map.RemoveGate(descriptor);
	}
	
	return map;
}

SystemController.prototype.getGateDescriptor = function(map,direction){
	var description;
	
	switch(direction){
		case "left":
			description = {"key":"col", "value":0};
			break;
		case "right":
			description = {"key":"col", "value":map.cols-1};
			break;
		case "top":
			description = {"key":"row", "value":0};
			break;
		case "bottom":
			description = {"key":"row", "value":map.rows-1};
			break;
	}
	
	return description;
}

SystemController.prototype.getConnections = function(room){
	if(!room) return null;
	
	//left, right, top, bottom 
	var col = room.col; var row = room.row;
	//directions[directionID][0] = row change : vertical
	//directions[directionID][1] = col change : horiizntal
	var directions = {"left": [0,-1], "right":  [0,1], "top":  [-1,0], "bottom":  [1,0] };
	
	var connections = [];
	var room, change, newRow, newCol, directionID;
	var totalRows = this.rows;
	var totalCols = this.cols;
	var system = this.rooms;
	
	for(directionID in directions) {
		change = directions[directionID];
		newRow = row + change[0]; 
		newCol = col + change[1];
		
		if(newRow >= 0 && newRow < totalRows && newCol >= 0 && newCol < totalCols) {
			room = system[newRow][newCol];
			if(room){
				var conn = {};
				conn[directionID] = room;
				connections.push(conn);
			}
		}
	}
	
	return connections;
}

//returns first found 'exit'...
//this system ID = 0
//next system that player visits will have id+1, and will be saved somewhere...
SystemController.prototype.getStartingSystem = function() {
	for(var row = 0; row < this.rows; row++){
		for(var col=0; col < this.cols; col++){
			if(this.rooms[row][col] && this.rooms[row][col].type == "gate"){
				return this.rooms[row][col];
			} 
		}
	}
	
	return null; //no gate found -> error
}

SystemController.prototype.getSystemById = function(id,size) {
	if(id === 0) return this.getStartingSystem();
	else {
		var system;
		for(var row = 0; row < size.rows; row++){
			for(var col = 0; col < size.cols; col++){
				if(system = this.rooms[row][col]) {
					if(system.id == id) return system;
				}
			}
		}
	}
	
	return null; //error
}

SystemController.prototype.GetLastLvlID = function() {
	//get that from player profile
	return this.lastLvlID;
}







