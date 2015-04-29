function Main() {
    var map;
    var factory;
    var _canvas;
    var ctx;
    var buffer;
    var bufferCtx;

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
            clearInterval(self.InitListener);
            self.Draw();

            //ready...
            self.Start();
        }
    }

    this.Start = function() {
        var grid = new Grid(8,14);
        grid.generateFromMap(map.GetMap());

        var test1 = new Pathfinder();
        test1.setGrid(grid);

        test1.setStartPoint(12,7);
        test1.setFinishPoint(12,3);

        alert(test1.findPath());
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