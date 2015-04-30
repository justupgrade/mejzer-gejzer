function QuestController() {
	this.quests = []; 
}

QuestController.prototype.load = function() {
	
}

QuestController.prototype.parse = function(data){
	this.quests = data;
}

QuestController.prototype.addQuest = function(player,npcID,questIDX) {
	var factory = new QuestFactory();
	var quest = factory.create(this.GetRawQuest(npcID,questIDX));
	//already completed that quest -> return null
	if(player.QuestCompleted(quest)){
		alert('Already completed!!!');
		return false;
	}
	//already has that quest? -> activate only new quests
	if(player.QuestExists(quest)){
		if(quest.IsCompleted(player)) {
			alert('completed');
			return true;
		}
		return null; //player.ActiveQuest = quest
	}
	return player.ActivateQuest(quest); //add quest to array and retuns it 
}

QuestController.prototype.GetRawQuest = function(npcID, questIDX){
	return this.quests[npcID-1][questIDX];
}