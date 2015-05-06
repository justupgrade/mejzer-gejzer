/**
 * 
 */

function WorldMenu() {
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.closeBtn = new Image();
	this.closeBtnOver = new Image();
	
	this.background.src = "img/world_menu/worldMapBack.png";
	this.closeBtn.src = "img/buttons/close_btn.png";
	this.closeBtnOver.src = "img/buttons/close_btn_over.png";
	
	this.rooms = null;
	this.currentRoom = null;
}

WorldMenu.prototype.Draw = function(ctx) {
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	this.drawSystems(ctx);
	
	this.resetSelection();
	
	this.offsetX = 50;
	this.offsetY = 50;
}

WorldMenu.prototype.drawSystems = function(ctx) {
	if(this.rooms !== null) {
		var cols = this.rooms[0].length;
		var rows = this.rooms.length;
		var room;
		
		for(var row = 0; row < rows; row++){
			for(var col=0; col < cols; col++){
				room = this.rooms[row][col];
				if(!room) continue;
				
				if(room === this.currentRoom) {
					ctx.fillStyle = this.getCurrentFillStyle();
				} else {
					ctx.fillStyle = this.getFillStyle();
				}
		        ctx.fillRect(this.offsetX + 35 * room.col, this.offsetY+ 35 * room.row,30,30);
			}
		
		}
	}
}

WorldMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}

WorldMenu.prototype.getFillStyle = function() {
    return "rgba(255,255,255,1)"; //white
}

WorldMenu.prototype.getCurrentFillStyle = function() {
    return "rgba(77,184,255,1)"; //white
}