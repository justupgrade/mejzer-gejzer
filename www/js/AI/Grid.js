/**
 * Created by tomasz on 27.04.15.
 */
//--------------------- GRID CLASS ---------------------
function Grid(height,width) { //number of rows x number of cols
    this.width = width;
    this.height = height;
    this.grid = []; //array[row][col]
    //col,row
    this.blockedTiles = [];
}


Grid.prototype.addBlock = function(point) {

}

Grid.prototype.removeBlock = function(point) {

}

Grid.prototype.isNewBlock = function(point) {

}

Grid.prototype.reset = function() {

}

Grid.prototype.generateFromMap = function(map) {
    var rows;
    var tile;
    this.grid = [];
    for(var row=0; row < map.length; row++){
        rows = [];
        for(var col=0; col < map[0].length; col++) {
            tile = new Tile(col,row);
            if(map[row][col] instanceof Monster === true) tile.SetMonster(true);
            else if(map[row][col] instanceof Wall === true) tile.setType(1); //block
            rows.push(tile);
        }
        this.grid.push(rows);
    }
}

Grid.prototype.generate = function() {
    var tile;
    for(var row=0; row < this.height; row++) {
        var rows = [];
        for(var col=0; col < this.width; col++) {
            tile = new Tile(col,row);
            for(var i=0; i < this.blockedTiles.length; i++) {
                if(col == this.blockedTiles[i].x && row == this.blockedTiles[i].y){
                    tile.setType(1);
                }
            }
            rows.push(tile);
        }
        this.grid.push(rows);
    }
}

Grid.prototype.getTile = function(col,row) {
    if(col >= 0 && col < this.width && row >= 0 && row < this.height)
        return this.grid[row][col];

    return null;
}

Grid.prototype.updateTile = function(tile, col,row) {
    if(col>=0 && col<this.width && row>=0 && row < this.height) {
        this.grid[row][col] = tile;
    }
}


