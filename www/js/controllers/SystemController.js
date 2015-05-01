/**
 * 
 */

function SystemController() {
	this.rooms = [];
	this.cols = 0;
	this.row = 0;
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

//remove gates from map that should not be there...
SystemController.prototype.updateGates = function(system,map) {
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