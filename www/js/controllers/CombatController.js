/**
 * 
 */

function CombatController() {
	this.player = null;
	this.enemy = null;
}

CombatController.prototype.init = function(player,enemy){
	this.player = player;
	this.enemy = enemy;
}

CombatController.prototype.solveTurn = function() {
	//who attack first? -> speed
	if(this.player.speed >= this.enemy.speed) {
		if(this.PlayerAttacksEnemy()) {
			if(!this.EnemyAttacksPlayer()) {
				//player died
			}
		} else {
			//enemy died
		}
		
	} else {
		if(this.EnemyAttacksPlayer()) {
			if(!this.PlayerAttacksEnemy()) {
				//enemy died
			}
		} else {
			//player died
		}
		
	}
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