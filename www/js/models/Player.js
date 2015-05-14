/**
 * 
 */

function Player() {
	this.gold = 0;
	this.lvl = 1;
	this.type = "mele";
	
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
	
	this.energy = 1;
	this.currentEnergy = 1;
	
	this.xp = 0;
	
	this.stamina = 1;
	this.ranged_strength = 1;
	this.offensiveAbility = 5;
	this.defensiveAbility = 1;
	this.inteligence = 1;
	
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
    	enemy.getHit(self.GetAttack());
    	this.xp += self.GetAttack();
    }
    
    this.getHit = function(dmg) {
    	this.armor -= Math.max(0,dmg-this.defence);
    	if(this.armor < 0) {
    		this.currentHP += this.armor;
    		this.armor = 0;
    	}
    	this.xp += dmg;
    }
    
    this.isAlive = function() {
    	return this.currentHP > 0;
    }
    
    this.GetProgressPercent = function() {
    	return this.xp / (100*this.lvl);
    }
    
    this.LevelUp = function() {
    	//console.log(this.xp, 100 * this.lvl);
    	
    	if(this.xp > 100 * this.lvl) {
    		this.hp += 5;
    		this.strength += 2;
    		this.stamina += 1;
    		this.inteligence += 1;
    		this.speed += 1;
    		this.energy += 1;
    		this.ranged_strength += 1;
    		this.armor += 5;
    		this.offensiveAbility += 2;
    		this.defensiveAbility += 1;
    		this.xp -= 100 * this.lvl;
    		this.lvl += 1;
    	}
    	
    	
    }
    
    this.LookIfQuestExists = function(quest){
    	for(var idx in this.quests){
    		if(this.quests[idx].GetID() == quest.GetID()) {
    			return true;
    		}
    	}
    	
    	return false;
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
    	if(quest.type == 'find_item'){
    		var item = this.inventory.getById(quest.item_id);
    		this.inventory.remove(item);
    	}
    	quest.MarkAsCompleted();
    	this.gold += quest.GetRewardGold();
    	this.UpdateExp(quest.GetRewardExp());
    	
    	var idx = this.quests.indexOf(quest);
    	this.questsCompleted.push(quest);
    	this.quests.splice(idx,1);
    	this.ActiveQuest = null; //set to previous quest
    }
    
    this.UpdateExp = function(exp) {
    	this.xp += exp;
    	this.LevelUp();
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
    
    this.GetCurrentHpPercent = function() {
    	return this.currentHP/this.hp;
    }
    
    this.GetStats = function() {
    	return {
    		"TYPE": this.type,
    		"HP": this.hp, 
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
    
    this.GetInventorySize = function() {
    	return this.inventory.inventory.length;
    }
    
    this.SerializeStats = function() {
    	var stats = this.GetStats();
    	stats['gold'] = this.gold;
    	stats['xp'] = this.xp;
    	stats['lvl'] = this.lvl;
    	stats['current_hp'] = this.currentHP;
    	
    	return stats;
    }
    
    this.SerializeQuestsCompleted = function() {
    	var qCompleted = [];
    	for(var idx in this.questsCompleted){
    		var quest = this.questsCompleted[idx];
    		qCompleted.push(quest.GetID());
    	}
    	return qCompleted;
    }
    
    this.SerializeQuestsActive = function() {
    	var qActive = [];
    	for(var idx in this.quests){
    		var quest = this.quests[idx];
    		qActive.push(quest.GetID());
    	}
    	return qActive;
    }
    
    this.LoadActiveQuests = function(data){
    	if(!data) return;
    	this.quests = data;
    }
    
    this.LoadCompletedQuests = function(data){
    	if(!data) return;
    	this.questsCompleted = data;
    }
    
    this.LoadStats = function(stats){
    	if(!stats) return;
    	this.gold = stats.gold;
    	this.xp = stats.xp;
    	this.lvl = stats.lvl;
    	this.currentHp = stats.current_hp;
    	
		this.type = stats["TYPE"]; 
		this.hp = stats["HP"]; 
		this.strength = stats["STR"];
		this.stamina = stats["STA"];
		this.inteligence = stats["INT"];
		this.speed = stats["SP"];
		this.energy = stats["EP"];
		this.ranged_strength = stats['RNS'];
		this.armor = stats['ARM'];
		this.offensiveAbility = stats['OA'];
    	this.defensiveAbility = stats['DA'];
    }
}

Player.prototype = new MapBlock();
Player.prototype.constructor = Player;