/**
 * 
 */

function NpcMenu() {
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.closeBtn = new Image();
	this.closeBtnOver = new Image();
	
	this.talkBtn = new Image();
	this.talkBtnSelected = new Image();
	this.actionsBtn = new Image();
	this.actionsBtnSelected = new Image();
	this.questsBtn = new Image();
	this.questsBtnSelected = new Image();
	this.okBtn = new Image();
	
	this.talkSelected = false;
	this.actionSelected = false;
	this.questSelected = false;
	
	this.background.src = "img/npc_menu/npcMenu.png";
	this.closeBtn.src = "img/buttons/close_btn.png";
	this.closeBtnOver.src = "img/buttons/close_btn_over.png";
	
	this.talkBtn.src = "img/npc_menu/talk_btn.png";
	this.talkBtnSelected.src = "img/npc_menu/talk_btn_selected.png";
	this.actionsBtn.src = "img/npc_menu/actions_btn.png";
	this.actionsBtnSelected.src = "img/npc_menu/actions_btn_selected.png";
	this.questsBtn.src = "img/npc_menu/quests_btn.png";
	this.questsBtnSelected.src = "img/npc_menu/quests_btn_selected.png";
	
	this.okBtn.src = "img/buttons/ok_btn.png";
	
	this.buttonSpacing = 110;
	this.buttonOffX = 10;
	this.buttonOffY = 10;
	
	this.selectedActionID = -1;
	
	this.questMenu = new QuestsMenu();
	this.questMenu.LoadQuestAssets();
}

NpcMenu.prototype.GetActionRightBound = function() {
	return this.buttonOffX + (3 * this.buttonSpacing);
}

NpcMenu.prototype.QuestActive = function() {
	if(!this.questMenu.selectedQuest) return false;
	
	//console.log('active: ', this.questMenu.selectedQuest.activated);
	
	return this.questMenu.selectedQuest.activated;
}

NpcMenu.prototype.QuestCompleted = function() {
	if(!this.questMenu.selectedQuest) return false;
	
	//console.log('completed: ', this.questMenu.selectedQuest.completed);
	
	return this.questMenu.selectedQuest.completed;
}

NpcMenu.prototype.deselectBtns = function() {
	this.talkSelected = false;
	this.actionSelected = false;
	this.questSelected = false;
	
	this.selectedActionID = -1;
}



NpcMenu.prototype.SelectAction = function(idx){
	this.selectedActionID = idx;
}

NpcMenu.prototype.Draw = function(ctx) {
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	//draw buttons:
	var talkImg = this.selectedActionID === 0 ? this.talkBtnSelected : this.talkBtn;
	var actionImg = this.selectedActionID === 1 ? this.actionsBtnSelected : this.actionsBtn;
	var questImg = this.selectedActionID === 2 ? this.questsBtnSelected : this.questsBtn;
	
	ctx.drawImage(talkImg, this.buttonOffX, this.buttonOffY);
	ctx.drawImage(actionImg, this.buttonOffX + this.buttonSpacing, this.buttonOffY);
	ctx.drawImage(questImg, this.buttonOffX + this.buttonSpacing * 2, this.buttonOffY);
	
	if(this.selectedActionID === 2) {
		this.drawQuestList(ctx);
	}
	
	this.resetSelection();
}

NpcMenu.prototype.drawQuestList = function(ctx) {
	//draw quest list 
	this.questMenu.drawQuestList(ctx);
	this.questMenu.drawSelectedQuestDetails(ctx);
	
	if(this.questMenu.selectedQuest && this.QuestActive() === false && this.QuestCompleted() === false) {
		//draw ok_btn : 
		var offX = this.questMenu.questDetailsOffsetX; //450
		var offY = 500 - 25 - 50;
		
		ctx.drawImage(this.okBtn, offX, offY);
	} else if(this.QuestCompleted()) {
		var text,tWidth;
		ctx.font = "25px Lucida";
		ctx.fillStyle = "yellow";
		ctx.fillText("Completed", 455, 470);
	}
	else if(this.QuestActive()){
		var text,tWidth;
		ctx.font = "25px Lucida";
		ctx.fillStyle = "green";
		ctx.fillText("Active", 455, 470);
	}
}

NpcMenu.prototype.GetAccpetQuestStartX = function() {
	return this.questMenu.questDetailsOffsetX;
}

NpcMenu.prototype.GetAcceptQuestStartY = function() {
	return 500-25-50;
}

NpcMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}

NpcMenu.prototype.GetSelectedQuestIDX = function() {
	return this.questMenu.selectedQuest.GetIDX();
}



