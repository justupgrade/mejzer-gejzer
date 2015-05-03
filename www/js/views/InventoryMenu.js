/**
 * 
 */

function InventoryMenu() {
	this.player = null;
	
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.closeBtn = new Image();
	this.closeBtnOver = new Image();
	this.itemBackImg = new Image();
	this.itemBackOnImg = new Image();
	
	//item info panel:
	this.itemLabelImg = new Image();
	this.itemTypeImg = new Image();
	this.useBtnEnabled = new Image();
	this.useBtnDisabled = new Image();
	
	this.background.src = "img/inventory_menu/inventoryMenu.png";
	this.closeBtn.src = "img/buttons/close_btn.png";
	this.closeBtnOver.src = "img/buttons/close_btn_over.png";
	this.itemBackImg.src = "img/inventory_menu/item_back.png";
	this.itemBackOnImg.src = "img/inventory_menu/item_back_on.png";
	
	//item info images:
	this.itemLabelImg.src = "img/inventory_menu/item_name_label.png";
	this.itemTypeImg.src = "img/inventory_menu/item_type_label.png";
	this.useBtnEnabled.src = "img/inventory_menu/item_use_btn.png";
	this.useBtnDisabled.src = "img/inventory_menu/item_use_btn_disabled.png";
	
	this.imgInvOffsetY = 100; 
	this.imgInvOffsetX = 350;
	this.imgItemSize = 51;
	
	this.maxCols = 8;
	this.maxRows = 7;
	
	this.selectedCol = null;
	this.selectedRow = null;
	
	this.selectedItem = null;
}

InventoryMenu.prototype.GetBottomBound = function() {
	return this.maxRows * this.imgItemSize + this.imgInvOffsetY;
}

InventoryMenu.prototype.GetRightBound = function() {
	return this.maxCols * this.imgItemSize + this.imgInvOffsetX;
}

InventoryMenu.prototype.deselect = function() {
	this.selectedCol = null;
	this.selectedRow = null;
}

InventoryMenu.prototype.select = function(col,row){
	this.selectedCol = col;
	this.selectedRow = row;
}

InventoryMenu.prototype.SetUpPlayer = function(player){
	this.player = player;
}

InventoryMenu.prototype.Draw = function(ctx) {
	var closeBtnX = 690;
	var closeBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.closeBtnOver,closeBtnX,closeBtnY);
	else ctx.drawImage(this.closeBtn,closeBtnX,closeBtnY);
	
	var imgRef = null;
	
	var numberOfItemsInInventory = this.player.GetInventorySize();
	var count = 0;
	//if(numberOfItemsInInventory == 0) return;
	
	for(var i = 0; i < this.maxCols; i++) {
		for(var j=0; j < this.maxRows; j++) {
			count++;
			
			if(i === this.selectedCol && j === this.selectedRow) imgRef = this.itemBackOnImg;
			else imgRef = this.itemBackImg;
			
			ctx.drawImage(
					imgRef, 
					this.imgInvOffsetX + i*this.imgItemSize, 
					this.imgInvOffsetY + j*this.imgItemSize
			);
			
			//if(count >= numberOfItemsInInventory) return;
		}
	}
	
	this.drawSelectedItemInfo(ctx);
}
/*
 * //type == weapon : options { use, drop } //wearable
	//type == armor : options { use, drop } //wearable
	//type == quest : options { none }
	//type == eatable//edible { use, drop }
 */
InventoryMenu.prototype.drawSelectedItemInfo = function(ctx) {
	//name,type,options:
	var text, tWidth;
	var type;
	var name;
	var useBtnRef = this.useBtnEnabled;
	
	if(this.selectedItem !== null){
		//draw backgrounds
		ctx.drawImage(this.itemLabelImg, 10, this.imgInvOffsetY);
		ctx.drawImage(this.itemTypeImg, 10, this.imgInvOffsetY + 50);
		//draw name:
		name = this.selectedItem.GetName();
		text = ctx.measureText(type);
		tWidth = text.width;
		ctx.font = "20px serif";
		ctx.fillStyle = "white";
		ctx.fillText(name, 10 +(200-tWidth)/2, this.imgInvOffsetY+25);
		//draw type:
		type = this.selectedItem.GetType();
		text = ctx.measureText(type);
		tWidth = text.width;
		ctx.font = "15px serif";
		ctx.fillStyle = "black";
		ctx.fillText(type, 10 +(200-tWidth)/2, this.imgInvOffsetY+20 + 50);
		
		if(this.selectedItem.GetType() == "quest") useBtnRef = this.useBtnDisabled;
		
		ctx.drawImage(useBtnRef, 10+100, this.imgInvOffsetY + 100);
	}
	
}

InventoryMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}