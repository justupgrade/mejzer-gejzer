function Pathfinder() {
    //alert('Pathfinder');
    this.openList = [];
    this.closedList = [];
}

Pathfinder.prototype.findPath = function() {
    var lastParent = this.start;

    while(lastParent !== this.finish) {
        this.addAdjacentTilesToOpenList(lastParent);
        this.moveToClosedList(lastParent);
        this.calculateCost(lastParent);
        lastParent = this.findTileWithTheLowestCost();
    }

    return this.finializeSearch(lastParent);
}

Pathfinder.prototype.finializeSearch = function(lastParent) {
    this.closedList.push(lastParent);
    //closedList ready to return path or null
    //var path = this.generatePath();
    //path.reverse();

    return this.closedList;
}

Pathfinder.prototype.generatePath = function() {
   /* var path = [];
    var tile = this.closedList[this.closedList.length-1];
    path.push(new Point(tile.getCol(), tile.getRow()));

    for(var i = this.closedList.length-2; i > 0; i--) {
        if(this.closedList[i] === tile.getParentTile() ) {
            tile = this.closedList[i];
            path.push(new Point(tile.getCol(), tile.getRow()));
        }
    }

    return path;*/
}

Pathfinder.prototype.findTileWithTheLowestCost = function() {
    var lowestCost = this.openList[0].getTotalCost();
    var tileWithLowestCost = this.openList[0];
    var tile;
    var cost;

    for(var i=1; i<this.openList.length; i++) {
        tile = this.openList[i];
        cost = tile.getTotalCost();
        if(cost <= lowestCost) {
            tileWithLowestCost = tile;
            lowestCost = cost;
        }
    }

    return tileWithLowestCost;
}

//calculate G: movement cost to starting point
//calculate H: movement cost to finish point
//calculate F: total cost = G + H
Pathfinder.prototype.calculateCost = function(potentialParent) {
    var tile;
    for(var i=0; i < this.openList.length; i++) {
        tile = this.openList[i];
        //if tile has already calculated G cost:
        if(tile.getTotalCost() == 0) {
            //for new tiles:
            tile.setGCost();
            tile.setHCost(this.finish);
        }


    }
}

Pathfinder.prototype.moveToClosedList = function(tile) {
    var index = this.openList.indexOf(tile);
    tile.inOpenList = false;
    this.openList.splice(index,1);
    tile.setClosedList(true);
    this.closedList.push(tile);
}



Pathfinder.prototype.addAdjacentTilesToOpenList = function(parentTile) {
    var adjacent = this.getAdjacentTiles(parentTile);
    var tile;

    for(var i=0; i < adjacent.length; i++) {
        tile = adjacent[i];

        if(tile.isOpen() && !tile.inClosedList){
            if(tile.inOpenList){
                var currentGCost = tile.getGCost();
                var potentialGCost = tile.calculateGCost(parentTile);

                if(currentGCost > potentialGCost) {
                    //alert('Parent changed!');
                    tile.setParentTile(parentTile);
                    tile.setGCost();
                }
            } else {
                this.openList.push(tile);
                tile.inOpenList = true;
                tile.setParentTile(parentTile);
            }

        }
    }
}



Pathfinder.prototype.getAdjacentTiles = function(centerTile) {
    var col = centerTile.getCol();
    var row = centerTile.getRow();
    var adjacent = [];
    var tile;

    //alert('row,col: ' + row + ',' + col);

    for(var i=row-1; i<=row+1; i++) {
        for(var j=col-1; j<=col+1; j++) {
            if(i === row && j === col) continue;
            tile = this.grid.getTile(j,i);
            if(tile === null) continue;
            if(tile.inClosedList) continue;

            if(i === row-1 && j === col+1) {
                if(!this.grid.getTile(j,i+1).isOpen()) continue;
                else if(!this.grid.getTile(j-1,i).isOpen()) continue;
            }
            else if(i === row+1 && j === col+1) {
                if(!this.grid.getTile(j,i-1).isOpen()) continue;
                else if(!this.grid.getTile(j-1,i).isOpen()) continue;
            }

            adjacent.push(tile);
        }
    }

    return adjacent;
}



//----------------------- set / get ---------------------
Pathfinder.prototype.setGrid = function(grid) {
    this.grid = grid;
}

Pathfinder.prototype.setStartPoint = function(x,y) {
    this.start = this.grid.getTile(x,y);
    this.openList.push(this.start);
    this.start.addToOpenList();
}

Pathfinder.prototype.setFinishPoint = function(x,y) {
    this.finish = this.grid.getTile(x,y);
}


