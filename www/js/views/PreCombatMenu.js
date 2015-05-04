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
	
	this.combatBtnX = 10;
	this.combatBtnY = 10;
}

PreCombatMenu.prototype.Draw = function(ctx) {
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCombatBtn) ctx.drawImage(this.combatBtnOver, this.combatBtnX, this.combatBtnY);
	else  ctx.drawImage(this.combatBtn, this.combatBtnX, this.combatBtnY);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	this.resetSelection();
}

PreCombatMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
	this.isMouseOverCombatBtn = false;
}