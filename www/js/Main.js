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
        if(map.loaded && inventoryController.loaded) {
        	//update map...
        	self.systemController.updateGates(null,map);
        	//set references...
        	combatController.AddInventoryController(inventoryController);
        	npcController.load(map.rawQuestData);
        	inventoryController.SetPlayer(map.GetPlayer());
        	
        	movementController.SetMap(map);
        	
        	
            clearInterval(self.InitListener);
            self.Draw();
            //ready...
            self.Start();
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
    	alert('gate clicked');
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