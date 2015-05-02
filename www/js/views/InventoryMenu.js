/**
 * 
 */

function InventoryMenu() {
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.closeBtn = new Image();
	this.closeBtnOver = new Image();
	
	this.background.src = "img/inventory_menu/inventoryMenu.png";
	this.closeBtn.src = "img/buttons/close_btn.png";
	this.closeBtnOver.src = "img/buttons/close_btn_over.png";
	
}

InventoryMenu.prototype.Draw = function(ctx) {
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	this.resetSelection();
}

InventoryMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}