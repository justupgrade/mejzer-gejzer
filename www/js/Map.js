function Map(factory) {
    this.map = null;
    this.player = null;
    this.factory = factory;
    this.loaded = false;
    this.cols = 0;
    this.rows = 0;
    
    this.rawQuestData = null;
    this.gates = [];
    
    
    var self = this;
    var tileSize = 30;


    /*
     *  lvl -> mazeID
     */
    this.Load = function(lvl) {
        var formdata = new FormData();
        formdata.append('lvl', 0);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', this.OnMapLoadHandler); //this.onMapLoadHandler
        xhr.open('POST', './actions/load_level.php');
        xhr.send(formdata);
    }

    this.OnMapLoadHandler = function(e){
    	//console.log('loaoded');
        self.ParseMonsters(JSON.parse(e.target.responseText)['monsters']);
        self.ParseNpcs(JSON.parse(e.target.responseText)['npcs']);
        self.ParseItems(JSON.parse(e.target.responseText)['items_in_room']);
        
        self.rawQuestData = JSON.parse(e.target.responseText)['quests'];
        map = self.ParseMap(JSON.parse(e.target.responseText)['room']);
    }
    
    this.ParseItems = function(data){
    	this.items = [];
    	
    	for(var idx in data){
    		this.items.push(data[idx]);
    	}
    }
    
    this.ParseNpcs = function(data){
    	var factory = new NpcFactory();
    	
    	this.npcs = [];
    	
    	for(var idx in data){
    		var descriptor = data[idx];
    		this.npcs.push(factory.create(descriptor));
    	}
    }
    
    this.ParseMonsters = function(data){
    	var factory = new MonsterFactory();
    	
    	this.monsters = [];
    	
    	for(var idx in data){
    		var descriptor = data[idx];
    		this.monsters.push(factory.create(descriptor));
    	}
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
                    case 1: 
                    	cell = new Gate(); 
                    	this.gates.push(cell);
                    	break;
                    case 2: cell = new Wall(); break;
                    case 3: cell = new Monster(); break;
                    case 4: cell = new QuestBlock(); break;
                    case 5: cell = new ItemBlock(); break;
                    case 6: 
                    	cell = new Empty();
                    	if(!this.player) {
                    		console.log('new player created', this.player);
                    		this.player = new Player();
                        	this.player.SetCords( {"COL":col, "ROW":row} );
                    	}
                    	
                    	break;
                }
                cell.SetCords({"COL":col, "ROW":row});
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
        
        for(var row=0; row < this.rows; row++){
            for(var col=0; col < this.cols; col++){
                ctx.fillStyle = this.map[row][col].GetFillStyle();
                ctx.fillRect(tileSize*col,tileSize*row,tileSize,tileSize);
            }
        }
        
        //draw player:
        var pCords = this.player.GetCords();
        ctx.fillStyle = this.player.GetFillStyle();
        ctx.fillRect(tileSize*pCords.COL,tileSize*pCords.ROW,tileSize,tileSize);
      //  ctx.arc(30*pCords.COL+15,30*pCords.ROW+15,15,0,2*Math.PI, false);
      //  ctx.fill();
    }

    this.GetMap = function() {
        return this.map;
    }
    
    this.GetPlayer = function() {
    	return this.player;
    }
    
    this.GetWidth = function() {
    	return this.cols;
    }
    
    this.GetHeight = function() {
    	return this.rows;
    }
    
    this.GetGates = function() {
    	return this.gates;
    }
    
    this.GetGate = function(location){
    	for(var idx in this.gates){
    		var gate = this.gates[idx];
    		if(gate.col == location.COL && gate.row == location.ROW){
    			return gate;
    		}
    	}
    	
    	return null;
    }
    
    this.GetGateByDescriptor = function(data){	
    	for(var gateIDX in this.gates){
    		if(this.gates[gateIDX][data.key] == data.value){
    			return this.gates[gateIDX];
    		}
    	}
    	
    	return null; //error...
    }
    
    this.GetMonster = function(location) {
    	for(var idx in this.monsters){
    		var monster = this.monsters[idx];
    		if(monster.col == location.COL && monster.row == location.ROW){
    			return monster;
    		}
    	}
    	return null;
    }
    
    this.GetItem = function(location) {
    	
    	for(var idx in this.items){
    		var item = this.items[idx];
    		if(item.col == location.COL && item.row == location.ROW) {
    			
    			return item;
    		}
    	}
    	
    	return null;
    }
    
    this.GetNpcByIdx = function(idx){
    	return this.npcs[idx] ? this.npcs[idx] : null;
    }
    
    this.GetNpc = function(location) {
    	for(var idx in this.npcs){
    		var npc = this.npcs[idx];
    		if(npc.col == location.COL && npc.row == location.ROW) {
    			return npc;
    		}
    	}
    	
    	return null;
    }
    
    this.RemoveGate = function(data){
    	var key = data.key; //COL or ROW
    	var value = data.value;
    	
    	//find gate -> 
    	var gate;
    	var gateIDX;
    	
    	for(gateIDX in this.gates){
    		if(this.gates[gateIDX][key] == value){
    			gate = this.gates[gateIDX]; break;
    		}
    	}
    	//put wall in gui:
    	var cell = new Wall();
    	cell.SetCords({"COL":gate.col, "ROW":gate.row});
    	this.map[gate.row][gate.col] = cell;
    	//remove gate from memory...
    	this.gates.splice(gateIDX,1);
    }
    
    this.RemoveMonster = function(enemy){
    	for(var idx in this.monsters){
    		var monster = this.monsters[idx];
    		if(monster.col == enemy.col && monster.row == enemy.row){
    			//monster to remove found!
    			var cell = new Empty();
    			cell.SetCords({"COL":monster.col, "ROW":monster.row});
    			this.map[monster.row][monster.col] = cell;
    			this.monsters.splice(idx,1);
    			break;
    		}
    	}
    }
    
    this.RemoveItem = function(item){
    	var cell = new Empty();
    	cell.SetCords({"COL":item.col, "ROW":item.row});
    	this.map[item.row][item.col] = cell;
    	var idx = this.items.indexOf(item);
    	this.items.splice(idx,1);
    }
    
    this.GetMonsters = function() {
    	return this.monsters;
    }
    
    this.MovePlayerTo = function(path) {
    	var finish = path[path.length-1];
    	
    	this.player.SetCords({"COL":finish.getCol(), "ROW":finish.getRow()});
    }
    
    this.UpdatePlayerPostion = function(cords){
    	this.player.SetCords({"COL":cords.COL, "ROW":cords.ROW});
    }
    
    this.GetSize = function() {
    	return {'cols':this.cols, 'rows':this.rows};
    }
}