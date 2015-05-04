//+ -> startX = 200, startY = 75 + 70 = 145
// mouseY 145 <-> 170
function StatsMenu() {
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.closeBtn = new Image();
	this.closeBtnOver = new Image();
	this.statsContImg = new Image();
	this.progressBar = new Image();
	
	this.background.src = "img/stats_menu/statsMenu.png";
	this.closeBtn.src = "img/buttons/close_btn.png";
	this.closeBtnOver.src = "img/buttons/close_btn_over.png";
	this.statsContImg.src = "img/stats_menu/player_stats_cont.png";
	this.progressBar.src = "img/player_menu/energy_bar.png";
	
	this.attrLabels = ["HP", "STR", "STA", "INT", "SP", "EP", 'RNS', 'ARM', 'OA', 'DA'];
	this.attrValues = null;
	
	this.player = null;
}

StatsMenu.prototype.SetUpPlayer = function(player){
	this.player = player;
}

StatsMenu.prototype.Draw = function(ctx) {
	this.attrValues = this.player.GetStats();
	
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	ctx.drawImage(this.statsContImg, 50, 70);
	//draw attrLabels
	var label;
	var value;
	var text;
	var tWidth;
	for(var idx in this.attrLabels){
		label = this.attrLabels[idx];
		value = this.attrValues[label];
		
		text = ctx.measureText(label);
		tWidth = text.width;
		ctx.font = "15px serif";
		ctx.fillStyle = "white";
		ctx.fillText(label, 250+idx*50 +(50-tWidth)/2, 70+15);
		
		text = ctx.measureText(value);
		tWidth = text.width;
		ctx.font = "15px Lucida";
		ctx.fillStyle = "black";
		ctx.fillText(value, 250+idx*50 +(50-tWidth)/2, 70+25+15);
	}
	
	
	var progress = this.player.GetProgressPercent();
	
	ctx.drawImage(this.progressBar, 50, 110, 200*progress, 10);
	
	this.resetSelection();
}

StatsMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}