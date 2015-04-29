/**
 * 
 */

MovementController = function() {
	//references...
	this.tilesize = 30;
	this.map = null;
	
	this.lastSelectedTile = null;
	this.lastSelectedMonster = null;
	this.lastSelectedNpc = null;
	this.lastSelectedItem = null;
}

//------------------- click actions ---------------
MovementController.prototype.clickedOnWall = function() {
	//reset everythings...
	this.lastSelectedTile = null;
	this.lastSelectedMonster = null;
	this.lastSelectedNpc = null;
	this.lastSelectedItem = null;
}


//----------------------------------------------------

MovementController.prototype.SetMap = function(map) {
	this.map = map;
}

MovementController.prototype.calculateCords = function(X,Y) {
	return {"X":Math.floor(X/this.tilesize), "Y":Math.floor(Y/this.tilesize)};
}

MovementController.prototype.getTile = function(cords){
	return map.GetMap()[cords.COL][cords.ROW];
}

MovementController.prototype.GetLastSelectedTile = function() {
	return this.lastSelectedTile;
}

MovementController.prototype.GetLastSelectedMonster = function() {
	return this.lastSelectedMonster;
}

MovementController.prototype.GetLastSelectedNpc = function() {
	return this.lastSelectedNpc;
}

MovementController.prototype.GetLastSelectedItem = function() {
	return this.lastSelectedItem;
}