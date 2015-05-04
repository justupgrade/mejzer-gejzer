/**
 * 
 */

function ItemPickedUpMenu() {
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.okBtn = new Image();
	this.okBtnOver = new Image();
	
	this.background.src = "img/item_pickup_menu/itemPickupMenu.png";
	this.okBtn.src = "img/item_pickup_menu/ok_btn.png";
	this.okBtnOver.src = "img/item_pickup_menu/ok_btn_on.png";
	
}

ItemPickedUpMenu.prototype.Draw = function(ctx) {
	var okBtnX = 690;
	var okBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.okBtnOver,okBtnX,okBtnY);
	else ctx.drawImage(this.okBtn,okBtnX,okBtnY);
	
	this.resetSelection();
}

ItemPickedUpMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}