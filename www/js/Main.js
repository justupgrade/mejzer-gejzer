function Main() {
    var map;
    var factory;
    var _canvas;
    var ctx;
    var buffer;
    var bufferCtx;
    var movementController = new MovementController();
    var combatController = new CombatController();
    var npcController = new NpcController();
    var inventoryController = new InventoryController();
    combatController.AddInventoryController(inventoryController);
    
    var self = this;
    
    var view = new ViewMachine(self);

    this.InitListener = null;
    this.player = null;
    
    var gameMenu = new GameMenu();
    var gameLoader = new GameLoader();
    
    this.SetSystemController = function(controller) {
    	this.systemController = controller;
    }

    this.GetPlayer = function() {
        return this.player;
    }

    this.Init = function() {
        factory = new MapFactory();
        map = new Map(factory);

        _canvas = document.getElementById('canvas');
        ctx = _canvas.getContext('2d');

        buffer = document.createElement('canvas');
        buffer.width = _canvas.width;
        buffer.height = _canvas.height;
        bufferCtx = buffer.getContext('2d');
        
        view.change(new GameView(view));

        return true;
    }

    this.Load = function() {
    	gameLoader.LoadPlayer();
        factory.Load();
        map.Load(self.systemController.GetLastLvlID());
        inventoryController.Load();
        this.InitListener = setInterval(this.GameReady, 50); //50ms
    }
    
    this.GameReady = function(evt) {
    	//console.log('loading inital...');
        if(map.loaded && inventoryController.loaded && factory.isLoaded() && gameLoader.isLoaded()) {
        	clearInterval(self.InitListener);
        	map.loaded = false;
        	//console.log(gameLoader.GetPlayerStats());
        	var memory = gameLoader.GetItemMemory();
        	map.GetPlayer().GetInventory().LoadMemory(memory);
        	map.UpdateItems(memory);
        	map.GetPlayer().LoadStats(gameLoader.GetPlayerStats());
        	//update map...
        	self.systemController.updateGates(null,map);
        	//set references...
        	gameMenu.UpdatePlayerRef(map.GetPlayer());
        	
        	npcController.load(map.rawQuestData); //quests for loaded map
        	npcController.SetUpPlayer(map.GetPlayer());
        	
        	inventoryController.SetPlayer(map.GetPlayer());
        	
        	movementController.SetMap(map);
        	map.RemoveFogAroundPlayer();
        	
        	//console.log('id:' + self.systemController.current.id)
            self.Draw();
            //ready...
            self.Start();
        }
    }
    
    this.GameLoaded = function(evt){
    	//console.log('loading new lvl...');
    	if(map.loaded){
    		map.loaded = false;
    		
    		var memory = gameLoader.GetItemMemory();
        	map.UpdateItems(memory);
        	
    		clearInterval(self.InitListener);
    		self.InitListener = null;
    		self.systemController.updateGates(null,map);
    		self.systemController.updatePlayerStartingPosition(map);
    		
    		gameMenu.UpdatePlayerRef(map.GetPlayer());
    		
    		npcController.load(map.rawQuestData);
    		npcController.SetUpPlayer(map.GetPlayer());
    		inventoryController.SetPlayer(map.GetPlayer());
    		movementController.SetMap(map);
    		
    		map.RemoveFogAroundPlayer();
    		self.Draw();
    		console.log('id:' + self.systemController.current.id);
    	}
    }

    this.Start = function() {
        //add listener to the canvas...
    	//console.log('started');
    	_canvas.addEventListener('click', this.onCanvasClick);
    	_canvas.addEventListener("mousemove", this.onCanvasMouseMove);
    }
    
    //-------------------- MOUSE HANDLERS SECTION ---------------------------
    var mouseX, mouseY;
    
    this.onCanvasClick = function(e) { //clientX, offsetX
    	view.update(e);
    }
    
    this.onCanvasMouseMove = function(e) {
    	view.update(e);
    }
    
    //------------------------ MOUSE HANDLERS END ---------------------------
    
    this.OpenCombatWindow = function(player,monster){
    	combatController.SetMap(map);
    	combatController.init(player,monster);
    	
    	view.change(new PreCombatView(view));
    	view.update(null);
    	//combatController.solveCombat();
    }
    movementController.SetCombatCallback(this.OpenCombatWindow);
    
    this.OpenNpcWindow = function(player, npc){
    	npcController.SetMap(map);
    	npcController.init(player,npc, this);
    	
    	//npcController.Start();
    	view.change(new NpcView(view));
    	view.update(null);
    }
    movementController.SetNpcCallback(this.OpenNpcWindow);
    
    this.OpenFoundItemWindow = function(player, item){
    	//add item to inventory...
    	var newItem = inventoryController.GetNewItemById(item.id);
    	inventoryController.addItem(newItem);
    	inventoryController.lastAddition(newItem);
    	map.RemoveItem(item);
    	
    	view.change(new ItemPickUpView(view));
    	view.update(null);
    }
    movementController.SetItemCallback(this.OpenFoundItemWindow);
    
    this.OpenGateWindow = function(player,gate) {
    	//save game:
    	self.saveGame();
    	//system controller -> change system; this->load new map...
    	self.systemController.setUpNewSystem(gate,map.GetSize());
    	var newLvlID = self.systemController.GetLastLvlID();
    	//console.log('new lvl: ' , newLvlID);
    	map.Load(newLvlID);
    	
    	self.InitListener = setInterval(self.GameLoaded, 50);
    }
    
    movementController.SetGateCallback(this.OpenGateWindow);
    
    this.saveGame = function() {
    	var stats = map.GetPlayer().SerializeStats();
    	var itemMemory = map.GetPlayer().inventory.SerializeMemory();
    	var data = {"stats":stats, "memory":itemMemory};
    	
    	var formdata = new FormData();
    	formdata.append('data', JSON.stringify(data));
    	
    	var xhr = new XMLHttpRequest();
    	xhr.addEventListener('load', self.onSaveCompleted);
    	xhr.open('POST', 'actions/save_game.php');
    	xhr.send(formdata);
    }
    
    this.onSaveCompleted = function(e){
    	//console.log(e.target.responseText);
    }

    this.Run = function() {
        if(this.Init()) this.Load();
    }

    this.InitialUpdateRun = function(evt){
        //...
    }

    this.Update = function(evt) {

    }

    this.Draw = function() {
        bufferCtx.clearRect(0,0,_canvas.width,_canvas.height);
        ctx.clearRect(0,0,_canvas.width,_canvas.height);
        
        map.Draw(bufferCtx);
        gameMenu.Draw(bufferCtx);
        
        ctx.drawImage(buffer, 0,0);
    }
    
    this.GetMap = function() {
    	return map;
    }

    this.GetMapArray = function() {
        return map.GetMap();
    }
    
    this.GetGameMenu = function() {
    	return gameMenu;
    }
    
    this.GetMovementController = function() {
    	return movementController;
    }
    
    this.GetInventoryController = function() {
    	return inventoryController;
    }
    
    this.GetQuestController = function() {
    	return npcController.questController;
    }
    
    this.GetNpcController = function() {
    	return npcController;
    }
    
    this.GetCombatController = function() {
    	return combatController;
    }
    
    this.GetInventoryController = function() {
    	return inventoryController;
    }
    
    this.GetSystemController = function() {
    	return self.systemController;
    }
}