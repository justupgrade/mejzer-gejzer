/**
 * 
 */

function NpcController() {
	this.view = null;
	this.npc = null;
	this.player = null;
	this.map = null;
	
	this.questController = new QuestController();
}

NpcController.prototype.load = function(quests) {
	if(!quests) this.questController.load();
	else this.questController.parse(quests);
}

NpcController.prototype.init = function(player,npc, view){
	this.view = view;
	this.npc = npc;
	this.player = player;
}

NpcController.prototype.SetMap = function(map){
	this.map = map;
}

NpcController.prototype.Start = function(){
	this.AddQuest(0);
}

/*
 * questIDX -> questIDX in npc_quests_array
 */
NpcController.prototype.AddQuest = function(questIDX) {
	var quest = this.questController.addQuest(this.player, this.npc.GetID(), questIDX);
	
	if(quest === false){ //quest already completd, player rewarded
		//do nothing
	} else if(quest === true) {
		//quest objective completed!!! reward player
		this.player.CompleteQuest(this.player.ActiveQuest); 
		alert("Quest Completed!!!");
	} else if(quest === null){
		//quest active but not completed -> set as ActiveQuest...
		alert("Already Active! " + this.player.ActiveQuest.GetQuestTitle());
	} else {
		//new quest...
		if(quest.IsCompleted(this.player)) {
			this.player.CompleteQuest(quest); 
			alert("Quest Completed!!!");
		} else {
			alert("Quest Activated! " + quest.GetQuestTitle());
		}
	}

	return quest;
}






