/**
 * 
 */

function Npc(){
	this.id = null;
	
}

Npc.prototype.Init = function(data){
	this.id = data.id;
	this.type = data.type;
	this.col = data.col;
	this.row = data.row;
}

Npc.prototype.GetID = function() {
	return this.id;
}