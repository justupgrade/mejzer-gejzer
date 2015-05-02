function GameMenu() {
	this.MENU_START_Y = 450;
	
	this.statsMenuOpened = false;
	this.questsSelected = false;
	this.statsSelected = false;
	
	this.statsImg = new Image();
	this.stats_selected = new Image();
	
	this.statsImg.src = "img/game_menu/stats.png";
	this.stats_selected.src = "img/game_menu/stats_selected.png";
	
	this.questsImg = new Image();
	this.quests_selected = new Image();
	
	this.questsImg.src = "img/game_menu/quests.png";
	this.quests_selected.src = "img/game_menu/quests_selected.png";
	
	this.statsMenu = new Image();
	this.statsMenu.src = "img/stats_menu/statsMenu.png";
}

GameMenu.prototype.Draw = function(ctx){
	if(this.statsMenuOpened) {
		ctx.drawImage(this.statsMenu,0,0);
	}
		
	if(this.statsSelected) ctx.drawImage(this.stats_selected,0,this.MENU_START_Y);
	else ctx.drawImage(this.statsImg,0,this.MENU_START_Y);
	
	if(this.questsSelected) ctx.drawImage(this.quests_selected,100,this.MENU_START_Y);
	else ctx.drawImage(this.questsImg,100,this.MENU_START_Y);
}

GameMenu.prototype.OnMenuClick = function(X,Y){
	this.deselectAllBtns();
	this.deselectAllMenus();
	
	if(X < 100) {
		//open stats menu
		this.statsMenuOpened = true;
	}
	else if(X > 100 && X < 200){
		//open quest log
	}
}



GameMenu.prototype.OnMenuMouseMove = function(X,Y) {
	this.deselectAllBtns();
	
	if(Y >= this.MENU_START_Y) {
		if(X < 100) this.statsSelected = true;
		else if(X > 100 && X < 200) this.questsSelected = true;
	}
}

GameMenu.prototype.deselectAllMenus = function() {
	this.statsMenuOpened = false;
}

GameMenu.prototype.deselectAllBtns = function() {
	this.questsSelected = false;
	this.statsSelected = false;
}