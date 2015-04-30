/**
 * 
 */

function QuestFactory() {
	this.create = function(data) {
		var quest;
		
		var type = data.type;
		
		if(type == "kill_monster") {
			quest = new KillQuest();
		} else if(type == "find_item") {
			quest = new FindItemQuest();
		}
		
		quest.Init(data);
		
		return quest;
	}
}
