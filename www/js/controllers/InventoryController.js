/**
 * 
 */

function InventoryController() {
	this.player = null;
	this.inventory = null;
	this.items = null;
	this.loaded = false;
}

InventoryController.prototype.SetPlayer = function(player){
	this.player = player;
	this.inventory = player.GetInventory();
}

InventoryController.prototype.Load = function() {
    var xhr = new XMLHttpRequest();
    xhr.self = this;
    xhr.addEventListener('load', this.OnItemLoadedHandler); 
    xhr.open('POST', './actions/load_items.php');
    xhr.send(null);
}

InventoryController.prototype.OnItemLoadedHandler = function(e){
	//alert(e.target);
	e.target.self.ParseItems(JSON.parse(e.target.responseText)['items']);
}

InventoryController.prototype.ParseItems = function(data){
	 
	var factory = new ItemFactory();
	this.items = [];
	
	for(var idx in data){
		this.items.push(factory.create(data[idx]));
	}
	
	this.loaded = true;
	
}

InventoryController.prototype.GetNewItemById = function(itemID){
	return this.items[itemID-1];
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

InventoryController.prototype.GetItemByIdx = function(idx){
	return this.inventory.getByIdx(idx);
}

InventoryController.prototype.changeWeapon = function(item) {
	if(!item.wearable) return;
	
	this.inventory.changeWeapon(item);
	this.player.Update();
}

InventoryController.prototype.changeArmor = function(item) {
	if(!item.wearable) return;
	
	this.inventory.changeArmor(item);
	this.player.Update();
}

InventoryController.prototype.wearItem = function(item) {
	if(item.type == "weapon") this.changeWeapon(item);
	else if(item.type == "armor") this.changeArmor(item);
}