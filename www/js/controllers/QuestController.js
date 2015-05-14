function QuestController() {
	this.quests = [];  //quests available in given room!!!
	this.player = null;
}

QuestController.prototype.SetUpPlayer = function(player) {
	this.player = player;
}

QuestController.prototype.load = function() {
	
}

//raw data (.json) from map.quests in specified room
QuestController.prototype.parse = function(data){
	this.quests = data;
}

QuestController.prototype.GetNpcQuests = function(npcID){
	var factory = new QuestFactory();
	var array = [];
	var quest;
	
	for(var idx in this.quests[npcID]){
		quest = factory.create(this.quests[npcID][idx]);
		quest.SetIDX(idx);
		array.push(quest);
	}
	
	return array;
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
			//alert('completed');
			player.ActiveQuest = quest;
			return true;
		}
		return null; //player.ActiveQuest = quest
	}
	return player.ActivateQuest(quest); //add quest to array and retuns it 
}

QuestController.prototype.GetRawQuest = function(npcID, questIDX){
	return this.quests[npcID-1][questIDX];
}

QuestController.prototype.GetRawQuestById = function(questID) {
	//quests[npcIDX][questIDX]
	//loop through quest of every npc:
	var npc, quest;
	var npcIDX, questIDX; 
	for(npcIDX in this.quests){
		npc = this.quests[npcIDX];
		for(questIDX in npc){
			quest = npc[questIDX];
			if(quest.questID == questID) {
				return quest;
			}
		}
	}
	
	return null;
}

//parse loaded indexes into array:
QuestController.prototype.ParseAllCompletedQuests = function(indexes) {
	var result = [];
	var factory = new QuestFactory();
	for(var i in indexes){
		var rawQuestData = this.GetRawQuestById(indexes[i]);
		var quest = factory.create(rawQuestData);
		quest.completed = true;
		result.push(quest);
	}
	
	return result;
}

QuestController.prototype.ParseAllActiveQuests = function(indexes){
	var result = [];
	var factory = new QuestFactory();
	for(var i in indexes){
		var quest = factory.create(this.GetRawQuestById(indexes[i]));
		result.push(quest);
	}
	
	return result;
}

//Get all player quests...
QuestController.prototype.GetAllQuests = function() {
	var idx;
	var allQuests = [];
	
	for(idx in this.player.quests){
		allQuests.push(this.player.quests[idx]);
	}
	for(idx in this.player.questsCompleted){
		allQuests.push(this.player.questsCompleted[idx]);
	}
	
	return allQuests.length > 0 ? allQuests : null;
}