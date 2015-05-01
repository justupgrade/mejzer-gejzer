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

    this.InitListener = null;
    this.player = null;
    
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

        return true;
    }

    this.Load = function() {
        factory.Load();
        map.Load(self.systemController.GetLastLvlID());
        inventoryController.Load();

        //set listener...
        //update
        //draw
        //setInterval
        this.InitListener = setInterval(this.GameReady, 50); //50ms
    }

    this.GameReady = function(evt) {
    	console.log('loading inital...');
        if(map.loaded && inventoryController.loaded) {
        	map.loaded = false;
        	//update map...
        	self.systemController.updateGates(null,map);
        	//set references...
        	
        	npcController.load(map.rawQuestData); //quests for loaded map
        	
        	inventoryController.SetPlayer(map.GetPlayer());
        	
        	movementController.SetMap(map);
        	
            clearInterval(self.InitListener);
            self.Draw();
            //ready...
            self.Start();
        }
    }
    
    this.GameLoaded = function(evt){
    	console.log('loading new lvl...');
    	if(map.loaded){
    		map.loaded = false;
    		clearInterval(self.InitListener);
    		self.InitListener = null;
    		
    		self.systemController.updateGates(null,map);
    		self.systemController.updatePlayerStartingPosition(map);
    		
    		npcController.load(map.rawQuestData);
    		inventoryController.SetPlayer(map.GetPlayer());
    		movementController.SetMap(map);
    		
    		
    		self.Draw();
    		console.log('loaded new lvl');
    	}
    }

    this.Start = function() {
        //add listener to the canvas...
    	console.log('started');
    	_canvas.addEventListener('click', this.onCanvasClick);
    }
    
    this.onCanvasClick = function(e) { //clientX, offsetX
    	movementController.clickHandler( {"X":e.clientX, "Y":e.clientY} );
    	
    	self.Draw();
    }
    
    this.OpenCombatWindow = function(player,monster){
    	combatController.SetMap(map);
    	combatController.init(player,monster);
    	combatController.solveCombat();
    }
    movementController.SetCombatCallback(this.OpenCombatWindow);
    
    this.OpenNpcWindow = function(player, npc){
    	npcController.SetMap(map);
    	npcController.init(player,npc, this);
    	npcController.Start();
    }
    movementController.SetNpcCallback(this.OpenNpcWindow);
    
    this.OpenFoundItemWindow = function(player, item){
    	//add item to inventory...
    	var newItem = inventoryController.GetNewItemById(item.id);
    	inventoryController.addItem(newItem);
    	map.RemoveItem(item);
    	
    	self.Draw();
    }
    movementController.SetItemCallback(this.OpenFoundItemWindow);
    
    this.OpenGateWindow = function(player,gate) {
    	//system controller -> change system; this->load new map...
    	self.systemController.setUpNewSystem(gate,map.GetSize());
    	map.Load(self.systemController.GetLastLvlID());
    	
    	self.InitListener = setInterval(self.GameLoaded, 50);
    }
    
    movementController.SetGateCallback(this.OpenGateWindow);

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
        ctx.drawImage(buffer, 0,0);
    }

    this.GetMapArray = function() {
        return map.GetMap();
    }
}