function GameMenu() {
	this.MENU_START_Y = 450;
	
	this.statsMenuOpened = false;
	this.questsMenuOpened = false;
	this.worldMenuOpened = false;
	
	this.questsSelected = false;
	this.statsSelected = false;
	this.isMouseOverWorldBtn = false;
	
	this.statsImg = new Image();
	this.stats_selected = new Image();
	
	this.statsImg.src = "img/game_menu/stats.png";
	this.stats_selected.src = "img/game_menu/stats_selected.png";
	
	this.questsImg = new Image();
	this.quests_selected = new Image();
	
	this.questsImg.src = "img/game_menu/quests.png";
	this.quests_selected.src = "img/game_menu/quests_selected.png";
	
	this.worldBtnImg = new Image();
	this.worldBtnSelectedImg = new Image();
	
	this.worldBtnImg.src = "img/game_menu/world_btn.png";
	this.worldBtnSelectedImg.src = "img/game_menu/world_btn_selected.png";
	
	this.statsMenu = new StatsMenu();
	this.questsMenu = new QuestsMenu();
	this.worldMenu = new WorldMenu();
}

GameMenu.prototype.Draw = function(ctx){
	if(this.statsMenuOpened) {
		this.statsMenu.Draw(ctx);
		return;
	} else if(this.questsMenuOpened){
		this.questsMenu.Draw(ctx);
		return;
	} else if(this.worldMenuOpened){
		this.worldMenu.Draw(ctx);
		return;
	}
		
	if(this.statsSelected) ctx.drawImage(this.stats_selected,0,this.MENU_START_Y);
	else ctx.drawImage(this.statsImg,0,this.MENU_START_Y);
	
	if(this.questsSelected) ctx.drawImage(this.quests_selected,100,this.MENU_START_Y);
	else ctx.drawImage(this.questsImg,100,this.MENU_START_Y);
	
	if(this.isMouseOverWorldBtn) ctx.drawImage(this.worldBtnSelectedImg,200,this.MENU_START_Y);
	else ctx.drawImage(this.worldBtnImg,200,this.MENU_START_Y);
}


GameMenu.prototype.OnMenuMouseMove = function(X,Y) {
	this.deselectAllBtns();
	
	if(Y >= this.MENU_START_Y) {
		if(X < 100) this.statsSelected = true;
		else if(X > 100 && X < 200) this.questsSelected = true;
		else if(X > 200 && X < 300) this.isMouseOverWorldBtn = true;
	}
}

GameMenu.prototype.deselectAllMenus = function() {
	this.statsMenuOpened = false;
	this.questsMenuOpened = false;
	this.worldMenuOpened = false;
}

GameMenu.prototype.deselectAllBtns = function() {
	this.questsSelected = false;
	this.statsSelected = false;
	this.isMouseOverWorldBtn = false;
}