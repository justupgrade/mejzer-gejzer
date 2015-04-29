function Map(factory) {
    this.map = null;
    this.factory = factory;
    this.loaded = false;
    this.cols = 0;
    this.rows = 0;
    var self = this;



    this.Load = function(lvl, callback) {
        var formdata = new FormData();
        formdata.append('lvl', 0);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', this.onMapLoadHandler); //this.onMapLoadHandler
        xhr.open('POST', './actions/load_level.php');
        xhr.send(formdata);
    }

    this.OnMapLoadHandler = function(e){
        map = self.ParseMap(JSON.parse(e.target.responseText));
    }

    this.ParseMap = function(data) {
        this.cols = data[0].length;
        this.rows = data.length;

        this.map = [];

        var array;
        var type = 0;
        var cell = null;

        for(var row=0; row < this.rows; row++){
            array = [];
            for(var col=0; col < this.cols; col++){
                type = data[row][col];
                switch(type){
                    case 0: cell = new Empty(); break;
                    case 1: cell = new Gate(); break;
                    case 2: cell = new Wall(); break;
                    case 3: cell = new Monster(); break;
                    case 4: cell = new Quest(); break;
                    case 5: cell = new Item(); break;
                }
                array.push(cell);
            }
            this.map.push(array);
        }

        this.loaded = true;
        
        return this.map;

    }

    this.Update = function() {

    }

    this.Draw = function(ctx) {
        var tileSize = 30;
        for(var row=0; row < this.rows; row++){
            for(var col=0; col < this.cols; col++){
                ctx.fillStyle = this.map[row][col].GetFillStyle();
                ctx.fillRect(30*col,30*row,30,30);
            }
        }
    }

    this.GetMap = function() {
        return this.map;
    }
}