/**
 * 
 */

function MonsterFactory() {
	this.create = function(data) {
		var monster;
		
		var type = data.type;
		
		if(type === "mele"){
			monster = new MeleEnemy();
		}
		
		monster.id = data.id;
		monster.type = data.type;
		monster.col = data.col;
		monster.row = data.row;
		
		return monster;
	}
}

function MeleEnemy() {
	this.strength = 3;
	this.defence = 2;
	this.speed = 3;
	this.range = 1;
	this.armor = 5;
	this.hp = 5;
	this.currentHP = 5;
}

MeleEnemy.prototype.Attack = function(enemy) {
	enemy.getHit(this.strength);
}

MeleEnemy.prototype.getHit = function(dmg) {
	this.armor -= Math.max(0,dmg-this.defence);
	if(this.armor < 0) {
		this.currentHP += this.armor;
		this.armor = 0;
	}
	
	return this.currentHP;
}

MeleEnemy.prototype.CounterAttack = function() {
	return this.strength;
}

MeleEnemy.prototype.isAlive = function() {
	return this.currentHP > 0;
}
