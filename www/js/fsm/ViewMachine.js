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
		container.playerGui.SetPlayerRef(root.GetMap().GetPlayer());
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
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().questsMenu;
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
	
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().inventoryMenu;
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

GameView.prototype = new State();
GameView.prototype.constructor = GameView;

QuestsView.prototype = new State();
QuestsView.prototype.constructor = QuestsView;

StatsView.prototype = new State();
StatsView.prototype.constructor = StatsView;

WorldView.prototype = new State();
WorldView.prototype.constructor = WorldView;

