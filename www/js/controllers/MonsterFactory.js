/**
 * 
 */

function MonsterFactory() {
	this.create = function(data) {
		var monster;
		
		var type = data.type;
		
		if(type === "monster"){
			monster = new Enemy();
		}
		
		monster.type = data.type;
		monster.col = data.col;
		monster.row = data.row;
		
		return monster;
	}
}

function Enemy() {
}
