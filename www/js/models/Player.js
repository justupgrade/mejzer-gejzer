/**
 * 
 */

function Player() {
	//mele warrior lvl 1
	this.strength = 5;
	this.defence = 2;
	this.speed = 3;
	this.range = 1;
	this.armor = 10;
	this.hp = 10;
	this.currentHP = 10;
	
	var self = this;
	
	this.GetImage = function() {
        return this.ImageRepository.Empty;
    }
    this.GetFillStyle = function() {
        return "rgba(200,50,100,1)"; //???
    }
    
    this.Attack = function(enemy) {
    	enemy.getHit(self.strength);
    }
    
    this.getHit = function(dmg) {
    	this.armor -= Math.max(0,dmg-this.defence);
    	if(this.armor < 0) {
    		this.currentHP += this.armor;
    		this.armor = 0;
    	}
    }
    
    this.isAlive = function() {
    	return this.currentHP > 0;
    }
}

Player.prototype = new MapBlock();
Player.prototype.constructor = Player;