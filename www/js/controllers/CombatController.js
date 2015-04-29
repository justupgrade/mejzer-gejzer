/**
 * 
 */

function CombatController() {
	this.player = null;
	this.enemy = null;
	this.map = null;
}

CombatController.prototype.SetMap = function(map) {
	this.map = map;
}

CombatController.prototype.init = function(player,enemy){
	this.player = player;
	this.enemy = enemy;
}

CombatController.prototype.solveCombat = function() {
	while(this.player.isAlive() && this.enemy.isAlive()) {
		this.solveTurn();
	}
	
	if(!this.player.isAlive()) this.RemovePlayer();
	else if(!this.enemy.isAlive()) this.RemoveEnemy();
}

CombatController.prototype.solveTurn = function() {
	//who attack first? -> speed
	if(this.player.speed >= this.enemy.speed) {
		if(this.PlayerAttacksEnemy()) {
			if(!this.EnemyAttacksPlayer()) {
				//player died
			}
		} else {
			//this.RemoveEnemy();
		}
		
	} else {
		if(this.EnemyAttacksPlayer()) {
			if(!this.PlayerAttacksEnemy()) {
				//this.RemoveEnemy();
			}
		} else {
			//player died
		}
		
	}
}

CombatController.prototype.RemoveEnemy = function() {
	//remove enemy from Map()->monsters 
	//remove monster tile from Map()->map :: change to Empty
	//redraw map
	//alert('enemy died!');
	this.map.RemoveMonster(this.enemy);
	
}

CombatController.prototype.RemovePlayer = function() {
	//GAME OVER!!!
	alert('player died');
}

CombatController.prototype.PlayerAttacksEnemy = function() {
	this.player.Attack(this.enemy);
	
	return this.enemy.isAlive();
}

CombatController.prototype.EnemyAttacksPlayer = function() {
	this.enemy.Attack(this.player);
	
	return this.player.isAlive();
}

CombatController.prototype.GetPlayer = function() {
	return this.player;
}

CombatController.prototype.GetEnemy = function() {
	return this.enemy;
}