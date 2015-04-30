/**
 * 
 */

function Player() {
	this.gold = 0;
	
	this.quests = [];
	this.questsCompleted = [];
	
	this.ActiveQuest = null;
	this.killHistory = []; 
	
	//mele warrior lvl 1
	this.strength = 5;
	this.weaponBonus = 0;
	
	this.defence = 2;
	this.speed = 3;
	this.range = 1;
	
	this.armor = 10;
	this.armorBonus = 0;
	
	this.hp = 10;
	this.currentHP = 10;
	
	var self = this;
	
	this.inventory = new Inventory();//empty inventory...
	
	this.GetInventory = function() {
		return this.inventory;
	}
	
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
    
    this.QuestExists = function(quest){
    	for(var idx in this.quests){
    		if(this.quests[idx].GetID() == quest.GetID()) {
    			this.ActiveQuest = quest;
    			return true;
    		}
    	}
    	
    	return false;
    }
    
    this.QuestCompleted = function(quest){
    	for(var idx in this.questsCompleted){
    		if(this.questsCompleted[idx].GetID() == quest.GetID()) return true;
    	}
    	
    	return false;
    }
    
    this.ActivateQuest = function(quest){
    	this.quests.push(quest);
    	this.ActiveQuest = quest;
    	
    	return quest;
    }
    
    this.CompleteQuest = function(quest){
    	this.gold += quest.GetRewardGold();
    	this.UpdateExp(quest.GetRewardExp());
    	
    	var idx = this.quests.indexOf(quest);
    	this.questsCompleted.push(quest);
    	this.quests.splice(idx,1);
    	this.ActiveQuest = null; //set to previous quest
    }
    
    this.UpdateExp = function(exp) {
    	
    }
    
    //killHistory[monster_type][monster_id];
    this.AddKillToHistory = function(monster_id){
    	this.killHistory.push(monster_id);
    }
    
    this.WasEnemyKilled = function(monster_id){
    	return this.killHistory.indexOf(monster_id) == -1 ? false : true;
    }
    
    this.HasItemInInventory = function(item_id){
    	return this.inventory.getById(item_id) === null ? false : true;
    }
    
    this.Update = function() {
    	//update stats after inventory change...
    	this.weaponBonus = this.inventory.GetWeaponDamage(this.strength);
    	this.armorBonus = this.inventory.GetArmorProtection(this.armor);
    }
    
    this.GetAttack = function() {
    	return (this.strength + this.weaponBonus);
    }
    
    this.GetArmor = function() {
    	return (this.armor + this.armorBonus);
    }
}

Player.prototype = new MapBlock();
Player.prototype.constructor = Player;