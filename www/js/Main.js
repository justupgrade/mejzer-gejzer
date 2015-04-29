function Main() {
    var map;
    var factory;
    var _canvas;
    var ctx;
    var buffer;
    var bufferCtx;
    var movementController = new MovementController();

    var self = this;

    this.InitListener = null;

    this.player = null;

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
        map.Load();

        //set listener...
        //update
        //draw
        //setInterval
        this.InitListener = setInterval(this.GameReady, 50); //50ms
    }

    this.GameReady = function(evt) {
        if(map.loaded) {
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