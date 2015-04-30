/**
 * 
 */

function NpcFactory() {
	this.create = function(data){
		var npc;
		var type = data.type;
		
		if(type === "npc") {
			npc = new Npc();
		}
		
		npc.Init(data);
		
		return npc;
	}
}