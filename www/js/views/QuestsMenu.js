/**
 * 
 */

function QuestsMenu() {
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.closeBtn = new Image();
	this.closeBtnOver = new Image();
	this.questLabel = new Image();
	this.questLabelSelected = new Image();
	this.questCompleted = new Image();
	this.questCompletedSelected = new Image();
	this.objectiveImg = new Image();
	this.rewardImg = new Image();
	this.objectiveBack = new Image();
	this.rewardBack = new Image();
	
	this.quests = null;
	this.selectedQuest = null;
	this.selectedQuestID = null;
	
	this.questLabelOffsetX = 50;
	this.questLabelOffsetY = 75;
	this.questLabelWidth = 300;
	this.questLabelHeight = 90;
	
	this.questDetailsOffsetX = 450;
	
}

QuestsMenu.prototype.LoadQuestAssets = function() {
	this.questLabel.src = "img/quests_menu/quest_label.png";
	this.questLabelSelected.src = "img/quests_menu/quest_label_selected.png";
	this.questCompleted.src = "img/quests_menu/quest_completed.png";
	this.questCompletedSelected.src = "img/quests_menu/quest_completed_selected.png";
	this.objectiveImg.src = "img/quests_menu/objectives_img.png";
	this.rewardImg.src = "img/quests_menu/reward_img.png";
	this.objectiveBack.src = "img/quests_menu/objective_back.png";
	this.rewardBack.src = "img/quests_menu/reward_back.png";
}

QuestsMenu.prototype.Load = function() {
	this.background.src = "img/quests_menu/questsMenu.png";
	this.closeBtn.src = "img/buttons/close_btn.png";
	this.closeBtnOver.src = "img/buttons/close_btn_over.png";
	this.LoadQuestAssets();
}

QuestsMenu.prototype.Draw = function(ctx) {
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	this.drawQuestList(ctx);
	this.drawSelectedQuestDetails(ctx);
	
	this.resetSelection();
}

QuestsMenu.prototype.selectQuest = function(idx){
	this.selectedQuest = null;
	this.selectedQuestID = idx;
}

/*
 * objective(s)
 * reward(s)
 */
QuestsMenu.prototype.drawSelectedQuestDetails = function(ctx){
	if(this.selectedQuest !== null){
		var text,tWidth,objective;
		
		ctx.drawImage(
			this.objectiveImg,
			this.questDetailsOffsetX, 
			this.questLabelOffsetY	
		);
		
		ctx.drawImage(
			this.objectiveBack,
			this.questDetailsOffsetX, 
			this.questLabelOffsetY + 25
		);
		
		objective = this.selectedQuest.GetObjective();
		text = ctx.measureText(objective);
		tWidth = text.width;
		ctx.font = "20px serif";
		ctx.fillStyle = "black";
		ctx.fillText(
				objective, 
				this.questDetailsOffsetX +(this.questLabelWidth-tWidth)/2, 
				this.questLabelOffsetY +25+20
		);
		
		ctx.drawImage(
			this.rewardImg,
			this.questDetailsOffsetX, 
			this.questLabelOffsetY + 50
		);
		
		var goldReward = "GOLD: " + this.selectedQuest.GetRewardGold();
		this.drawReward(ctx, {'txt':goldReward, 'Y':75});
		
		var expReward = "XP: " + this.selectedQuest.GetRewardExp();
		this.drawReward(ctx, {'txt':expReward, 'Y':100});
		
	}
}

QuestsMenu.prototype.drawReward = function(ctx, details) {
	ctx.drawImage(
		this.rewardBack,
		this.questDetailsOffsetX,
		this.questLabelOffsetY + details.Y
	);
	
	var text,tWidth;
	text = ctx.measureText(details.txt);
	tWidth = text.width;
		
	this.drawText(ctx, {
		'text':details.txt, 
		'X': this.questDetailsOffsetX +(this.questLabelWidth-tWidth)/2,
		'Y': this.questLabelOffsetY +details.Y+20,
		'fillStyle': "black", 'font': "20px serif"
	});
}

QuestsMenu.prototype.drawText = function(ctx,content) {
	ctx.font = content.font;
	ctx.fillStyle = content.fillStyle;
	ctx.fillText(content.text, content.X, content.Y);
}

QuestsMenu.prototype.drawQuestList = function(ctx) {
	if(this.quests !== null) {
		var idx, quest;
		var questBack;
		var text,tWidth,title;
		var posY;
		
		for(idx in this.quests){
			quest = this.quests[idx];
			
			//console.log(idx,this.selectedQuestID);
			
			if(this.selectedQuestID === parseInt(idx)){
				this.selectedQuest = quest;
				
				if(quest.GetCompleted()) {
					questBack = this.questCompletedSelected;
				} else {
					questBack = this.questLabelSelected;
				}
			} else {
				if(quest.GetCompleted()){
					questBack = this.questCompleted;
				} else {
					questBack = this.questLabel;
				}
			}
			
			posY = this.questLabelOffsetY + this.questLabelHeight*idx;
			
			ctx.drawImage(
					questBack,
					this.questLabelOffsetX, 
					posY
			);
			
			title = quest.GetQuestTitle();
			
			text = ctx.measureText(title);
			tWidth = text.width;
			ctx.font = "20px serif";
			ctx.fillStyle = "white";
			ctx.fillText(
					title, 
					this.questLabelOffsetX +(this.questLabelWidth-tWidth)/2, 
					posY+25
			);
			
			if(idx >= 4) return;
		}
	}
}

QuestsMenu.prototype.clearMenu = function() {
	this.quests = null;
	this.selectedQuest = null;
	this.selectedQuestID = null;
	
	this.resetSelection();
}

QuestsMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}