/**
 * 
 */

function PlayerGui() {
	this.background = new Image();
	this.healthBar = new Image();
	this.energyBar = new Image();
	
	this.background.src = "img/player_menu/background.png";
	this.healthBar.src = "img/player_menu/hp_bar.png";
	this.energyBar.src = "img/player_menu/energy_bar.png";
	
	this.player = null;
}

PlayerGui.prototype.SetUpPlayer = function(player) {
	this.player = player;
}

PlayerGui.prototype.Draw = function(ctx){
	var percent = this.player.GetCurrentHpPercent();
	var hpScale = 100 * percent;
		
	ctx.drawImage(this.background,690,0);
	ctx.drawImage(this.healthBar,695,5, hpScale, 25);
	ctx.drawImage(this.energyBar,695,30);
}