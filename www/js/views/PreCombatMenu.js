/**
 * 
 */

function PreCombatMenu() {
	this.isMouseOverCloseBtn = false;
	this.isMouseOverCombatBtn = false;
	
	this.background = new Image();
	this.closeBtn = new Image();
	this.closeBtnOver = new Image();
	
	this.combatBtn = new Image();
	this.combatBtnOver = new Image();
	
	this.background.src = "img/combat_menu/combatMenu.png";
	this.closeBtn.src = "img/combat_menu/cancel_btn.png";
	this.closeBtnOver.src = "img/combat_menu/cancel_btn_on.png";
	
	this.combatBtn.src = "img/combat_menu/combat_btn.png";
	this.combatBtnOver.src = "img/combat_menu/combat_btn_on.png";
	
	this.combatBtnX = 10;
	this.combatBtnY = 10;
	
	this.attrLabels = ["TYPE", "HP", "STR", "STA", "INT", "SP", "EP", 'RNS', 'ARM', 'OA', 'DA'];
	this.attrs = ['Type','HP','Strength','Stamina','Inteligence','Speed','Energy',
	              'Ranged Str','Armor','Off Ability','Def Ability'];
	
	this.monsterValues = null;
	this.playerValues = null;
	this.monster = null;
	this.player = null;
}

PreCombatMenu.prototype.SetUpMonster = function(monster,player){
	this.monster = monster;
	this.player = player;
	this.monsterValues = monster.GetStats();
	this.playerValues = player.GetStats();
}

PreCombatMenu.prototype.Draw = function(ctx) {
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	
	if(this.isMouseOverCombatBtn) ctx.drawImage(this.combatBtnOver, this.combatBtnX, this.combatBtnY);
	else  ctx.drawImage(this.combatBtn, this.combatBtnX, this.combatBtnY);
	
	//display monster info
	this.displayMonsterInfo(ctx);
	
	this.resetSelection();
}

PreCombatMenu.prototype.displayMonsterInfo = function(ctx) {
	ctx.font = "15px Lucida";
	ctx.fillStyle = "black";
	
	var offsetX = 55;
	var offsetY = 120;
	
	ctx.fillText("ENEMY", 190, offsetY - 25);
	ctx.fillText("PLAYER", 280, offsetY - 25);
	
	var idx, monsterValue, playerValue; 
	for(idx in this.attrs) {
		monsterValue = this.monsterValues[this.attrLabels[idx]];
		playerValue = this.playerValues[this.attrLabels[idx]];
		
		ctx.fillStyle = "black";
		
		ctx.fillText(this.attrs[idx], offsetX, offsetY + idx * 25);
		
		if(playerValue > monsterValue) ctx.fillStyle = "green";
		else if(playerValue < monsterValue) ctx.fillStyle = "red";
		else ctx.fillStyle = "yellow";
		
		ctx.fillText(monsterValue, 200, offsetY + idx * 25);
		ctx.fillText(playerValue, 300, offsetY + idx * 25);
	}

}

PreCombatMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
	this.isMouseOverCombatBtn = false;
}