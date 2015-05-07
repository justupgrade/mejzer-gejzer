/**
 * Created by tomasz on 25.04.15.
 */
function MapFactory() {
    this.Empty = null;
    this.Gate = new Image();
    this.Wall = new Image();
    this.Monster = new Image();
    this.PlayerBlock = null;
    this.ItemBlock = null;
    this.QuestBlock = new Image();
    this.Floor = null;

    var imgsLoaded = 0;
    var meleLoaded = 0;
    var itemsLoaded = 0;
    var monstersLoaded = 0;
    
    this.isLoaded = function() {
    	return imgsLoaded === 4 && 
    	meleLoaded === 10 && 
    	itemsLoaded === 4 && 
    	monstersLoaded === 10;
    };

    this.Load = function() {
    	imgsLoaded = 0;
    	this.loadMeleEnemies();
    	this.loadItems();
    	this.loadMonsters();
    	for(var key in this) if(this[key] != null) this[key].onload = function() { imgsLoaded++; }
    }
    
    var meleEnemies = [];
    this.loadMeleEnemies = function() {
    	var img;
    	for(var i=0; i < 10; i++){
    		var img = new Image();
    		img.onload = function() { meleLoaded++; }
    		meleEnemies.push(img);
    		img.src = "img/mele/mele"+(i+1)+".png";
    	}
    }
    
    var monsters = [];
    this.loadMonsters = function() {
    	var img;
    	for(var i=0; i < 10; i++){
    		var img = new Image();
    		img.onload = function() { monstersLoaded++; }
    		monsters.push(img);
    		img.src = "img/monster/m"+(i+1)+".png";
    	}
    }
    
    var items = []; //weapon, armor, stick
    var sources = ["weapon.png", "armor.png", "stick.png", "honey.png"];
    this.loadItems = function() {
    	var img;
    	for(var idx = 0; idx < sources.length; idx++) {
    		img = new Image();
        	img.onload = function() { itemsLoaded++; }
        	items.push(img);
        	img.src = 'img/other/'+sources[idx];
    	}
    }
    
    this.Wall.src = "img/wall.png";
    this.Monster.src = 'img/mele.png';
    this.Gate.src = 'img/other/gate1.gif';
    this.QuestBlock.src = 'img/quest.png';
    
    
    this.GetItem = function(type){
    	//console.log(type);
    	switch(type){
    	case "weapon":
    		return items[0];
    	case "armor": 
    		return items[1];
    	case "stick": 
    		return items[2];
    	case "food":
    		return items[3];
    		default:
    	return null;
    	}
    }
    
    this.GetMonster = function(){
    	var idx = Math.floor(Math.random()*10);
    	
    	return monsters[idx];
    }
    
    this.GetMeleEnemy = function() {
    	var idx = Math.floor(Math.random()*10);
    	
    	return meleEnemies[idx];
    }
   
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
	var img = null;
    this.GetImage = function() {
    	if(!img){
    		var rand = Math.random() * 100;
    		if(rand > 25) img = this.ImageRepository.GetMeleEnemy();
    		else img = this.ImageRepository.GetMonster();
    	}
        return  img;
    }
    this.GetFillStyle = function() {
        return "rgba(255,0,0,1)"; //red
    }
}

function QuestBlock() {
    this.GetImage = function() {
        return this.ImageRepository.QuestBlock;
    }
    this.GetFillStyle = function() {
        return "rgba(0,0,200,1)"; //blue
    }
}

function ItemBlock(type) {
	this.ref = null;
	if(type) this.ref = type;
	
    this.GetImage = function() {
        return this.ImageRepository.GetItem(this.ref);
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
ItemBlock.prototype = new MapBlock();
ItemBlock.prototype.constructor = ItemBlock;
QuestBlock.prototype = new MapBlock();
QuestBlock.prototype.constructor = QuestBlock;