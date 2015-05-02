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

function GameView(machine) {
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	var container = null;
	
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
    		return;
    	} 
    	
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
    		}
    		
    	} else { //update player position
    		self.root.GetMovementController().clickHandler( {"X":mouseX, "Y":mouseY} );
    	}
    	
    	self.root.Draw();
	}
	
	this.MouseMoveHandler = function() {
		self.root.GetGameMenu().OnMenuMouseMove(mouseX,mouseY);
		self.root.Draw();
	}
}

function QuestsView(machine){
	var mouseX, mouseY;
	var self = this;
	var container = null;
	self.machine = machine;
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().questsMenu;
	}
	
	this.Update = function(e){
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
	var container = null;
	self.machine = machine;
	
	
	this.Enter = function(root){
		self.root = root;
		container = self.root.GetGameMenu().statsMenu;
	}
	
	this.Update = function(e){
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

