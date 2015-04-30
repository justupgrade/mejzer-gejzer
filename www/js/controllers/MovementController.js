/**
 * 
 */

MovementController = function() {
	//references...
	this.tilesize = 30;
	this.map = null;
	
	this.lastSelectedTile = null;
	this.lastSelectedMonster = null;
	this.lastSelectedNpc = null;
	this.lastSelectedItem = null;
}

MovementController.prototype.SetCombatCallback = function(value) {
	this.CombatCallback = value;
}


MovementController.prototype.SetNpcCallback = function(value) {
	this.NpcCallback = value;
}

MovementController.prototype.SetItemCallback = function(value){
	this.ItemCallback = value;
}


//------------------- click actions ---------------
MovementController.prototype.clickHandler = function(location) {
	var cords = this.calculateCords(location.X, location.Y);
	
	if(cords != null) {
		
		//what was clicked? 
		var tile = this.getTile({"COL":cords.X, "ROW":cords.Y});
		
		if(tile instanceof Empty){
			//console.log('empty');
			this.clickedOnFloor(tile);
		} else if(tile instanceof Monster){
			//console.log('monster');
			this.clickedOnMonster(this.getMonster({"COL":cords.X, "ROW":cords.Y}));
		} else if(tile instanceof Gate) {
			//console.log('gate');
		} else if(tile instanceof Wall) {
			//console.log('wall');
			this.clickedOnWall();
		} else if(tile instanceof QuestBlock) {
			this.clickedOnQuestBlock(this.getNPC({"COL":cords.X, "ROW":cords.Y}));
		} else if(tile instanceof ItemBlock) {
			this.clickedOnItemBlock(this.getItem({"COL":cords.X, "ROW":cords.Y}));
		}
	}
}

MovementController.prototype.clickedOnItemBlock = function(item){
	
	if(this.lastSelectedItem != null && this.lastSelectedItem == item){
		
		if(this.distanceFromPlayer(item) == 1){
			this.resetSelection();
			this.OpenItemWindow(item);
		} else {
			//get path to target:
			this.resetSelection();
			
			var start = this.map.GetPlayer().GetCords();
			var finish = {"COL":item.col,"ROW":item.row};
			
			//monster in the path? -> splice path
			var path =  this.generatePath(start,finish);
			if(path == null) return;
			path.splice(path.length-1,1);
			
			if(this.isMonsterInPath(path)) {
				return null;
			} else {
				//move to target
				this.map.MovePlayerTo(path);
				this.OpenItemWindow(item);
			}
			
			return path;
		}
		
	}
	
	
	this.resetSelection();
	this.lastSelectedItem = item;
	return true;
}

MovementController.prototype.clickedOnQuestBlock = function(npc){
	//console.log(npc);
	if(this.lastSelectedNpc != null && this.lastSelectedNpc == npc){
		
		if(this.distanceFromPlayer(npc) == 1){
			this.resetSelection();
			this.OpenNpcWindow(npc);
		} else {
			this.resetSelection();
			var start = this.map.GetPlayer().GetCords();
			var finish = {"COL":npc.col,"ROW":npc.row};
			var path =  this.generatePath(start,finish);
			
			if(path == null) return null;
			
			path.splice(path.length-1,1); //no need to stand on npc tile...
			
			if(this.isMonsterInPath(path)) {
				return null;
			} else {
				//move to target
				this.map.MovePlayerTo(path);
				//open combat window
				this.OpenNpcWindow(npc);
			}
			
			return path;
		}
	}
	
	this.resetSelection();
	this.lastSelectedNpc = npc;
	return true;
}

MovementController.prototype.clickedOnMonster = function(monster) {
	if(this.lastSelectedMonster != null && this.lastSelectedMonster == monster){
		//move close to monster (if not aleady and open fight menu)
		if(this.distanceFromPlayer(monster) == 1){
			this.resetSelection();
			//open combat window...
			this.OpenCombatWindow(monster);
		} else {
			//get path to target:
			this.resetSelection();
			
			var start = this.map.GetPlayer().GetCords();
			var finish = {"COL":monster.col,"ROW":monster.row};
			
			//monster in the path? -> splice path
			var path =  this.generatePath(start,finish);
			path.splice(path.length-1,1);
			
			if(this.isMonsterInPath(path)) {
				return null;
			} else {
				//move to target
				this.map.MovePlayerTo(path);
				//open combat window
				this.OpenCombatWindow(monster);
			}
			
			return path;
		}
		
	}
	

	this.resetSelection();
	this.lastSelectedMonster = monster;
	return true;
}

MovementController.prototype.OpenItemWindow = function(item){
	this.ItemCallback(this.GetPlayer(), item);
}

MovementController.prototype.OpenNpcWindow = function(target) {
	//callback?
	this.NpcCallback(this.GetPlayer(), target);
}

MovementController.prototype.OpenCombatWindow = function(monster) {
	//callback?
	this.CombatCallback(this.GetPlayer(), monster);
}

MovementController.prototype.distanceFromPlayer = function(target) {
	var playerLocation = this.GetPlayer().GetCords();
	
	//console.log(target.col,target.row);
	
	if(Math.abs(playerLocation.COL - target.col) <= 1 &&
			Math.abs(playerLocation.ROW - target.row <= 1)) return 1;
	
	return 0;
}

MovementController.prototype.clickedOnWall = function() {
	//reset everythings...
	this.resetSelection();
}

MovementController.prototype.clickedOnFloor = function(tile) {
	//first click -> calculate path... 
	var start = this.map.GetPlayer().GetCords();
	var finish = tile.GetCords();
	
	//clicked on same tile...
	if(this.lastSelectedTile != null && this.lastSelectedTile == tile) {
		this.resetSelection();
		var path = this.generatePath(start,finish);
		//move to that tile...
		if(path != null && !this.isMonsterInPath(path)) {
			//console.log('move to ...' + finish.COL + ", " + finish.ROW);
			this.map.MovePlayerTo(path);
		} else {
			return null;
		}
		return path;
	}
	//clicked on tile with player...
	if(start.COL == finish.COL && start.ROW == finish.ROW) {
		this.resetSelection();
		
		return null;
	}
	
	if(this.lastSelectedTile == null) {
		this.lastSelectedTile = tile;
		
		return true;
	}
	
	return "last return";
}

MovementController.prototype.isMonsterInPath = function(path) {
	for(var idx in path) {
		var tile = path[idx];
		if(tile.hasMonster) return true;
	}
	
	return false;
}

MovementController.prototype.generatePath = function(start,finish) {
	var grid = new Grid(this.map.GetHeight(), this.map.GetWidth());
	grid.generateFromMap(this.map.GetMap());
	var pathfinder = new Pathfinder();
	pathfinder.setGrid(grid);
	pathfinder.setStartPoint(start.COL,start.ROW);
	pathfinder.setFinishPoint(finish.COL,finish.ROW);
	var path = pathfinder.findPath();
	
	return path;
}

//----------------------

MovementController.prototype.resetSelection = function() {
	this.lastSelectedTile = null;
	this.lastSelectedMonster = null;
	this.lastSelectedNpc = null;
	this.lastSelectedItem = null;
}

//----------------------------------------------------

MovementController.prototype.SetMap = function(map) {
	this.map = map;
}

MovementController.prototype.calculateCords = function(X,Y) {
	var col = Math.floor(X/this.tilesize);
	var row = Math.floor(Y/this.tilesize);
	
	if(col >= this.map.GetWidth() || row >= this.map.GetHeight() || col < 0 || row < 0) return null;
	
	return {"X":col, "Y":row};
}

MovementController.prototype.getNPC = function(cords){
	return this.map.GetNpc(cords);
}

MovementController.prototype.getItem = function(cords) {
	return this.map.GetItem(cords);
}

MovementController.prototype.GetPlayer = function() {
	return this.map.GetPlayer();
}

MovementController.prototype.getTile = function(cords){
	return this.map.GetMap()[cords.ROW][cords.COL];
}

MovementController.prototype.getMonster = function(cords){
	return this.map.GetMonster(cords);
}

MovementController.prototype.GetLastSelectedTile = function() {
	return this.lastSelectedTile;
}

MovementController.prototype.GetLastSelectedMonster = function() {
	return this.lastSelectedMonster;
}

MovementController.prototype.GetLastSelectedNpc = function() {
	return this.lastSelectedNpc;
}

MovementController.prototype.GetLastSelectedItem = function() {
	return this.lastSelectedItem;
}