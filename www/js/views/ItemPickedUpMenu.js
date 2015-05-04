/**
 * 
 */

function ItemPickedUpMenu() {
	this.isMouseOverCloseBtn = false;
	
	this.background = new Image();
	this.okBtn = new Image();
	this.okBtnOver = new Image();
	
	this.itemLabel = new Image();
	this.itemLabelSelected = new Image();
	
	this.background.src = "img/item_pickup_menu/itemPickupMenu.png";
	this.okBtn.src = "img/item_pickup_menu/ok_btn.png";
	this.okBtnOver.src = "img/item_pickup_menu/ok_btn_on.png";
	
	this.itemLabel.src = "img/item_pickup_menu/item_label.png";
	this.itemLabelSelected.src = "img/item_pickup_menu/item_label_selected.png";
	
	this.items = null;
	
	this.labelOffsetX = 50;
	this.labelOffsetY = 75;
	this.labelHeight = 90;
	
	this.selectedItem = null;
	this.selectedItemID = -1;
}

ItemPickedUpMenu.prototype.Draw = function(ctx) {
	var okBtnX = 690;
	var okBtnY = 10;
	
	ctx.drawImage(this.background,0,0);
	
	if(this.isMouseOverCloseBtn) ctx.drawImage(this.okBtnOver,okBtnX,okBtnY);
	else ctx.drawImage(this.okBtn,okBtnX,okBtnY);
	
	this.drawItems(ctx);
	this.drawItemDetails(ctx);
	
	this.resetSelection();
}

ItemPickedUpMenu.prototype.selectItem = function(idx){
	this.selectedItem = null;
	this.selectedItemID = idx;
}

ItemPickedUpMenu.prototype.drawItems = function(ctx) {
	//item label ? item details ...
	if(this.items){
		var idx, item, posY,itemBack;
		for(idx in this.items){
			item = this.items[idx];
			posY = this.labelOffsetY + idx * this.labelHeight;
			
			
			if(this.selectedItemID === parseInt(idx)){
				this.selectedItem = item;
				itemBack = this.itemLabelSelected;
			} else {
				itemBack = this.itemLabel;
			}
			
			ctx.drawImage(itemBack, this.labelOffsetX, posY);
		}
	}
}

ItemPickedUpMenu.prototype.drawItemDetails = function(ctx){
	//type,name,other stats...
	var details;
	var count;
	var text;
	if(this.selectedItem){
		details = this.selectedItem.GetDetailsDescriptor();
		count = 0;
		
		ctx.font = "15px Lucida";
		ctx.fillStyle = "black";
		
		for(var key in details){
			ctx.fillText(key, 455, this.labelOffsetY + 25 + 25 * count);
			ctx.fillText(details[key], 555, this.labelOffsetY + 25 + 25 * count);
			
			count++;
		}
	}
}

ItemPickedUpMenu.prototype.resetSelection = function() {
	this.isMouseOverCloseBtn = false;
}