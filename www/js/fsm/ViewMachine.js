/**
 * 
 */

function ViewMachine(root) {
	var currentState = null;
	var root = root;
	
	this.change = function(state){
		currentState = state;
		currentState.Enter(root);
	}
	
	this.update = function(e) {
		currentState.Update(e);
	}
}

function State() {
	
}

function GameView(machine) {
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	
	
	this.Enter = function(root) {
		self.root = root;
		container = self.root.GetGameMenu();
	}
	
	this.Update = function(e) {
		if(!e) return;
		
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
    	
    	if(e.type === "mousemove") {
    		self.MouseMoveHandler();
    	} else if(e.type === "click"){
    		self.MouseClickHanlder();
    	}

    	self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		container.deselectAllBtns();
		
		if(mouseY >= container.MENU_START_Y) {
			if(mouseX < 100) container.statsSelected = true;
			else if(mouseX > 100 && mouseX < 200) container.questsSelected = true;
			else if(mouseX > 200 && mouseX < 300) container.isMouseOverWorldBtn = true;
			else if(mouseX > 300 && mouseX < 400) container.isMouseOverInventoryBtn = true;
		}
	}
	
	this.MouseClickHanlder = function() {
		//change view...
    	if(mouseY >= container.MENU_START_Y) {
    		container.deselectAllBtns();
    		container.deselectAllMenus();
    		
    		if(mouseX < 100){
    			container.statsMenuOpened = true;
    			self.machine.change(new StatsView(self.machine));
    		}
    		else if(mouseX > 100 && mouseX < 200){
    			container.questsMenuOpened = true;
    			self.machine.change(new QuestsView(self.machine));
    		} else if(mouseX > 200 && mouseX < 300){
    			container.worldMenuOpened = true;
    			self.machine.change(new WorldView(self.machine));
    		} else if(mouseX > 300 && mouseX < 400) {
    			container.inventoryMenuOpened = true;
    			self.machine.change(new InventoryView(self.machine));
    		}
    		
    	} else { //update player position
    		self.root.GetMovementController().clickHandler( {"X":mouseX, "Y":mouseY} );
    	}
	}
}

function QuestsView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	var controller;
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().questsMenu;
		controller = self.root.GetQuestController();
		container.clearMenu();
		container.quests = controller.GetAllQuests();
	}
	
	this.Update = function(e){
		if(!e) return;
		
		//console.log("quest view update test:", self.UpdateTest(e));
		
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
		
		if(e.type === "mousemove") {
			self.MouseMoveHandler();
		} else if(e.type === "click"){
			self.MouseClickHanlder();
		}
		
		self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		//highlight close button
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCloseBtn = true;
		}
	}
	
	this.MouseClickHanlder = function() {
		//close stats menu; return to main game menu
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		} else if(mouseX > container.questLabelOffsetX && 
				mouseX < container.questLabelOffsetX + 300) {
			if(mouseY > container.questLabelOffsetY && mouseY < container.questLabelOffsetY + 350) {
				var questIdx = Math.floor((mouseY - container.questLabelOffsetY)/container.questLabelHeight);
				container.selectQuest(questIdx);
				//console.log(questIdx);
			}
		}
	}
}

function NpcView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	var controller = null;
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().npcMenu;
		controller = self.root.GetNpcController();
		container.deselectBtns();
	}
	
	this.Update = function(e){
		self.root.GetGameMenu().npcMenuOpened = true;
		if(!e) {
			self.root.Draw();
			return;
		}
		//console.log("stats view update test:", self.UpdateTest(e));
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
		
		if(e.type === "mousemove") {
			self.MouseMoveHandler();
		} else if(e.type === "click"){
			self.MouseClickHanlder();
			self.root.Draw();
		}
		
		
	}
	
	this.MouseMoveHandler = function() {
		//console.log(container);
		//highlight close button
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCloseBtn = true;
			self.root.Draw();
		} else {
			return;
		}
	}
	
	this.MouseClickHanlder = function() {
		var cont = container.questMenu;
		//console.log(container.questMenu);
		//close stats menu; return to main game menu
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		} else if(mouseY > container.buttonOffY && mouseY < 60){
			if(mouseX > container.buttonOffX && mouseX < container.GetActionRightBound()){
				var actionIDX = Math.floor((mouseX - container.buttonOffX)/container.buttonSpacing);
				container.SelectAction(actionIDX);
				
				container.questMenu.quests = controller.GetAllNpcQuests();
			}
		}
		//option clicked (quest1, quest2, etc)
		else if(mouseX > cont.questLabelOffsetX && 
				mouseX < cont.questLabelOffsetX + 300) {
			if(mouseY > cont.questLabelOffsetY && mouseY < cont.questLabelOffsetY + 350) {
				var questIdx = Math.floor((mouseY - cont.questLabelOffsetY)/cont.questLabelHeight);
				cont.selectQuest(questIdx);
				self.root.Draw();
				if(container.QuestActive() && container.QuestCompleted() !== true){
					controller.AddQuest(questIdx);
					container.questMenu.quests = controller.GetAllNpcQuests();
					self.root.Draw();
				}
				
			}
		}
		//accept menu clicked?
		else if(mouseX > container.GetAccpetQuestStartX() && mouseX < container.GetAccpetQuestStartX() + 100) {
			if(mouseY > container.GetAcceptQuestStartY() && mouseY < container.GetAcceptQuestStartY() + 50) {
				//accept btn clicked -> addQuest (if quest menu active)
				if(container.QuestActive() === false && container.QuestCompleted() === false) {
					controller.AddQuest(container.GetSelectedQuestIDX());
					
					container.questMenu.quests = controller.GetAllNpcQuests();
					self.Update(null);
				}
			}
		}
	}
}

function StatsView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().statsMenu;
	}
	
	this.Update = function(e){
		if(!e) return;
		//console.log("stats view update test:", self.UpdateTest(e));
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
		
		if(e.type === "mousemove") {
			self.MouseMoveHandler();
		} else if(e.type === "click"){
			self.MouseClickHanlder();
		}
		
		self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		//highlight close button
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCloseBtn = true;
		}
	}
	
	this.MouseClickHanlder = function() {
		//close stats menu; return to main game menu
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		}
	}
}

function WorldView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().worldMenu;
	}
	
	this.Update = function(e){
		if(!e) return;
		//console.log("stats view update test:", self.UpdateTest(e));
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
		
		if(e.type === "mousemove") {
			self.MouseMoveHandler();
		} else if(e.type === "click"){
			self.MouseClickHanlder();
		}
		
		self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		//highlight close button
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCloseBtn = true;
		}
	}
	
	this.MouseClickHanlder = function() {
		//close stats menu; return to main game menu
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		}
	}
}



function InventoryView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	var controller;
	
	//enter 'spells' (logic):
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().inventoryMenu;
		controller = self.root.GetInventoryController();
		//container clear...
		container.selectedItem = null;
		container.selectedCol = null;
		container.selectedRow = null;
	}
	
	this.Update = function(e){
		if(!e) return;
		//console.log("stats view update test:", self.UpdateTest(e));
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
    	
    	container.resetSelection();
		
		if(e.type === "mousemove") {
			self.MouseMoveHandler();
		} else if(e.type === "click"){
			self.MouseClickHanlder();
		}
		
		self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		//highlight close button
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCloseBtn = true;
		}
	}
	
	this.MouseClickHanlder = function() {
		//console.log(container.imgInvOffsetX,mouseX,container.GetRightBound());
		//close stats menu; return to main game menu
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		} else if(mouseX > container.imgInvOffsetX && mouseX < container.GetRightBound()){
			
			if(mouseY > container.imgInvOffsetY && mouseY < container.GetBottomBound()) {
				container.deselect();
				//select item...
				var col = Math.floor((mouseX - container.imgInvOffsetX)/container.imgItemSize);
				var row = Math.floor((mouseY - container.imgInvOffsetY)/container.imgItemSize);
				container.select(col,row);
				
				//some magic:
				var itemIDX = col + (row*container.maxCols);
				container.selectedItem = controller.GetItemByIdx(itemIDX);
				//console.log(itemIDX);
			}
		}
	}
}

function ItemPickUpView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().itemPickMenu;
	}
	
	this.Update = function(e){
		self.root.GetGameMenu().itemPickMenuOpened = true;
		if(!e) {
			self.root.Draw();
			return;
		}
		//console.log("stats view update test:", self.UpdateTest(e));
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
		
		if(e.type === "mousemove") {
			self.MouseMoveHandler();
		} else if(e.type === "click"){
			self.MouseClickHanlder();
		}
		
		self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		//highlight close button
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCloseBtn = true;
		}
	}
	
	this.MouseClickHanlder = function() {
		//close stats menu; return to main game menu
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		}
	}
}

function PreCombatView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	var controller;
	
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().preCombatMenu;
		controller = self.root.GetCombatController();
	}
	
	this.Update = function(e){
		self.root.GetGameMenu().preCombatMenuOpened = true;
		if(!e) {
			self.root.Draw();
			return;
		}
		//console.log("stats view update test:", self.UpdateTest(e));
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
		
		if(e.type === "mousemove") {
			self.MouseMoveHandler();
		} else if(e.type === "click"){
			self.MouseClickHanlder();
		}
		
		self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		//highlight close button
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCloseBtn = true;
		} else if(mouseX > container.combatBtnX && mouseX < 110 && mouseY > 10 && mouseY < 60){
			container.isMouseOverCombatBtn = true;
		}
	}
	
	this.MouseClickHanlder = function() {
		//close stats menu; return to main game menu
		if(mouseX > 690 && mouseX < 790 && mouseY > 10 && mouseY < 60){
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		} else if(mouseX > container.combatBtnX && mouseX < 110 && mouseY > 10 && mouseY < 60){
			controller.solveCombat();
			self.root.GetGameMenu().deselectAllMenus();
			self.machine.change(new GameView(self.machine));
		}
	}
}

GameView.prototype = new State();
GameView.prototype.constructor = GameView;

QuestsView.prototype = new State();
QuestsView.prototype.constructor = QuestsView;

StatsView.prototype = new State();
StatsView.prototype.constructor = StatsView;

WorldView.prototype = new State();
WorldView.prototype.constructor = WorldView;

