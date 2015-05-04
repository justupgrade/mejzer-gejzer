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
	this.inteligence = 1;
	this.energy = 1;
	this.ranged_strength = 1;
	this.offensiveAbility = 3;
	this.defensiveAbility = 1;
	this.stamina = 2;
}

MeleEnemy.prototype.GetStats = function() {
	return {
		"TYPE":this.type,
		"HP":this.hp, 
		"STR":this.strength, 
		"STA":this.stamina, 
		"INT":this.inteligence, 
		"SP":this.speed, 
		"EP":this.energy, 
		'RNS':this.ranged_strength, 
		'ARM':this.armor,
		'OA':this.offensiveAbility, 
		'DA':this.defensiveAbility
	};
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
