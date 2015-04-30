/**
 * 
 */

function InventoryController() {
	this.player = null;
	this.inventory = null;
}

InventoryController.prototype.SetPlayer = function(player){
	this.player = player;
	this.inventory = player.GetInventory();
}

InventoryController.prototype.addItem = function(item) {
	this.inventory.add(item);
	this.player.Update();
}

InventoryController.prototype.removeItem = function(item){
	this.inventory.remove(item);
	this.player.Update();
}

InventoryController.prototype.GetCurrentWeapon = function() {
	return this.inventory.weapon;
}

InventoryController.prototype.FindItemById = function(id) {
	return this.inventory.getById(id);
}

InventoryController.prototype.changeWeapon = function(item) {
	this.inventory.changeWeapon(item);
	this.player.Update();
}

InventoryController.prototype.changeArmor = function(item) {
	this.inventory.changeArmor(item);
	this.player.Update();
}

InventoryController.prototype.wearItem = function(item) {
	if(item.type == "weapon") this.changeWeapon(item);
	else if(item.type == "armor") this.changeArmor(item);
}