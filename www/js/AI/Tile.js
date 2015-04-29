/**
f * Created by tomasz on 27.04.15.
 */
//--------------------- TILE CLASS ----------------------
function Tile(x,y) {
    this.col = x;
    this.row = y;
    this.type = 0; //0->open
    this.gCost = 0; //cost to starting tile
    this.hCost = 0; //cost to finish file
    this.parentTile = null;
    this.inOpenList = false;
    this.inClosedList = false;
    this.hasMonster = false;
}

Tile.prototype.reset = function() {
    this.type = 0;
    this.gCost = 0;
    this.hCost = 0;
    this.parentTile = null;
    this.inOpenList = false;
    this.inClosedList = false;
    this.hasMonster = false;
}

Tile.prototype.SetMonster = function(value) {
	this.hasMonster = value;
}

Tile.prototype.setClosedList = function(value) {
    this.inClosedList = value;
}

Tile.prototype.addToOpenList = function() {
    this.inOpenList = true;
}

Tile.prototype.removeFromOpenList = function() {
    this.inOpenList = false;
}

Tile.prototype.addToClosedList = function() {
    this.inClosedList = true;
//	alert('added to closed list!: ' + this.isInClosedList());
}

Tile.prototype.removeFromClosedList = function() {
    this.inClosedList = false;
}

Tile.prototype.setType = function(type) {
    this.type = type;
    //alert(this.col + "," + this.row)
}

Tile.prototype.setGCost = function() {
    this.gCost = this.calculateGCost(this.parentTile);
}

Tile.prototype.calculateGCost = function(parentTile) {
    if(this.col - parentTile.getCol() == 0 ||
        this.row - parentTile.getRow() == 0) {
        //diagonal +10
        return parentTile.getGCost() + 10;
    } else { //non-diagonal + 14
        return parentTile.getGCost() + 14;
    }
}

Tile.prototype.isInClosedList = function() {
    return this.inClosedList;
}

Tile.prototype.isInOpenList = function() {
    return this.inOpenList;
}

Tile.prototype.setHCost = function(finishTile) {
    this.hCost = (10*(Math.abs(this.col-finishTile.getCol()) +
    Math.abs(this.row-finishTile.getRow())));
}

Tile.prototype.getTotalCost = function() {
    return (this.gCost + this.hCost);
}

Tile.prototype.getGCost = function() {
    return this.gCost;
}

Tile.prototype.getHCost = function() {
    return this.hCost;
}

Tile.prototype.setParentTile = function(parentTile) {
    this.parentTile = parentTile;
}

Tile.prototype.getParentTile = function() {
    return this.parentTile;
}

Tile.prototype.isOpen = function() {
    //alert(this.hasUnit, this.unit.teamID, scoutUnitID);
    return this.type === 0;
}

Tile.prototype.getCol = function() {
    return this.col;
}

Tile.prototype.getRow = function() {
    return this.row;
}

Tile.prototype.getType = function() {
    return this.type;
}
