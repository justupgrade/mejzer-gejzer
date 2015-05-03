/**
	monster killed -> loop through quests with monster data
	quest activated -> loop through quests with history_of_possible_quest_actions
	
	possible quest actions:
		-> monster has to be killed
		-> item in inventory
		
	onMonsterKilled() {
		killed_monsters_history.add(monster_id)
 * 
 */

function Quest() {
	this.completed = false;
	this.type = null;
	this.questID = null;
	this.rewardGold = 0;
	this.rewardExp = 0;
	this.activated = false;
	
	this.Init = function(data) {
		//to override!!
	}
	
	this.GetID = function() {
		return this.questID;
	}
	
	this.GetType = function() {
		return this.type;
	}
	
	this.GetRewardGold = function() {
		return this.rewardGold;
	}
	
	this.GetRewardExp = function() {
		return this.rewardExp;
	}
	
	//TO OVERRIDE!!!
	this.IsCompleted = function(player) {
		throw new Error("ABSTRACT METHOD!!!");
	}
	
	this.GetCompleted = function(){
		return this.completed;
	}
	
	this.MarkAsCompleted = function() {
		this.completed = true;
	}
}

function KillQuest() {
	this.Init = function(data) {
		this.questID = data.questID;
		this.type = data.type;
		this.goalCol = data.col;
		this.goalRow = data.row;
		this.rewardExp = data.reward.exp;
		this.rewardGold = data.reward.gold;
		this.monsterID = data.monsterID;
	}
	
	this.GetQuestTitle = function() {
		return "Kill Monster! (col,row): (" + this.goalCol + "," + this.goalRow + ")";
	}
	
	this.GetMonsterToKillID = function() {
		return this.monsterID;
	}
	
	this.IsCompleted = function(player) {
		return player.WasEnemyKilled(this.monsterID);
	}
	
	this.GetObjective = function() {
		return "Kill Monster_Name!";
	}
}

function FindItemQuest() {
	this.Init = function(data) {
		this.questID = data.questID;
		this.type = data.type;
		this.item_id = data.item_id;
		this.rewardExp = data.reward.exp;
		this.rewardGold = data.reward.gold;
		this.item_name = data.item_name;
	}
	
	this.GetQuestTitle = function() {
		return "Bring me item: (" + this.item_name + ")";
	}
	
	this.IsCompleted = function(player) {
		//has in inventory?
		return player.HasItemInInventory(this.item_id);
	}
	
	this.GetObjective = function() {
		return "Find " + this.item_name;
	}
}

KillQuest.prototype = new Quest();
KillQuest.prototype.constructor = KillQuest;

FindItemQuest.prototype = new Quest();
FindItemQuest.prototype.constructor = FindItemQuest();