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
	
	this.Enter = function(root) {
		self.root = root;
	}
	
	this.Update = function(e) {
		if(!e) return;
		
		mouseX = e.pageX - e.target.offsetLeft;
    	mouseY = e.pageY - e.target.offsetTop;
    	
    	//change view...
    	if(mouseY >= self.root.GetGameMenu().MENU_START_Y) {
    		self.root.GetGameMenu().OnMenuClick(mouseX,mouseY);
    		self.machine.change(new StatsView(self.machine));
    	} else {
    		self.root.GetMovementController().clickHandler( {"X":e.clientX, "Y":e.clientY} );
    	}
    	
    	self.root.Draw();
	}
}

function StatsView(machine){
	var mouseX, mouseY;
	var self = this;
	self.machine = machine;
	
	this.Enter = function(root){
		self.root = root;
	}
	
	this.Update = function(e){
		if(!e) return;
	}
}

