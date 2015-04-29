/**
 * Created by tomasz on 25.04.15.
 */
function MapFactory() {
    this.Empty = null;
    this.Gate = null;
    this.Wall = null;
    this.Monster = null;
    this.Player = null;
    this.Item = null;
    this.Quest = null;
    this.Floor = null;

    var imgsLoaded = 0;
    this.isLoaded = function() {
        return imgsLoaded === 6;
    }

    this.Load = function() {
        imgsLoaded = 0;
        for(var key in this){
            if(this[key] != null)
                this[key].onload = function() { imgsLoaded++; }
        }
    }

    //hacks
    //...
    //set source of images to load...
    //...
}

function MapBlock() {
    this.GetImage = function() {
        //implement if image
        return null;
    }
    this.GetFillStyle = function() {
        //filled rectangle?Main.prototype.load = function()
        return null;
    }
    
    this.col = null;
    this.row = null;
    
    this.SetCords = function(cords) {
    	this.col = cords.COL;
    	this.row = cords.ROW;
    }
    
    this.GetCords = function() {
    	return {"COL":this.col, "ROW":this.row};
    }

    this.ImageRepository = null;
}


function Gate() {
    this.GetImage = function() {
        return this.ImageRepository.Gate;
    }
    this.GetFillStyle = function() {
        return "rgba(0,0,0,1)"; //black
    }
}

function Empty() {
    this.GetImage = function() {
        return this.ImageRepository.Empty;
    }
    this.GetFillStyle = function() {
        return "rgba(255,255,255,1)"; //white
    }
}

function Wall() {
    this.GetImage = function() {
        return this.ImageRepository.Wall;
    }
    this.GetFillStyle = function() {
        return "rgba(100,0,0,1)"; //brown
    }
}

function Monster() {
    this.GetImage = function() {
        return this.ImageRepository.Monster;
    }
    this.GetFillStyle = function() {
        return "rgba(255,0,0,1)"; //red
    }
}

function Quest() {
    this.GetImage = function() {
        return this.ImageRepository.Quest;
    }
    this.GetFillStyle = function() {
        return "rgba(0,0,200,1)"; //blue
    }
}

function Item() {
    this.GetImage = function() {
        return this.ImageRepository.Item;
    }
    this.GetFillStyle = function() {
        return "rgba(0,200,0,1)"; //green
    }
}

function Floor() {
    this.GetImage = function() {
        return this.ImageRepository.Floor;
    }
    this.GetFillStyle = function() {
        return "rgba(125,125,125,1)"; //gray
    }
}

Empty.prototype = new MapBlock();
Empty.prototype.constructor = Empty;
Gate.prototype = new MapBlock();
Gate.prototype.constructor = Gate;
Wall.prototype = new MapBlock();
Wall.prototype.constructor = Wall;
Floor.prototype = new MapBlock();
Floor.prototype.constructor = Floor;
Monster.prototype = new MapBlock();
Monster.prototype.constructor = Monster;
Item.prototype = new MapBlock();
Item.prototype.constructor = Item;
Quest.prototype = new MapBlock();
Quest.prototype.constructor = Quest;