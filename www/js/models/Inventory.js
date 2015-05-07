function Inventory() {
	this.inventory = [];
	this.weapon = null;
	this.armor = null;
	this.memory = [];
}

Inventory.prototype.add = function(item) {
	if(this.memory.indexOf(item.itemID) == -1) {
		this.memory.push(item.itemID);
	}
	
	if(item.type == "weapon") {
		if(this.weapon == null) this.weapon = item;
		else this.inventory.push(item);
	} else if(item.type == "armor"){
		if(this.armor == null) this.armor = item;
		else this.inventory.push(item);
	} else {
		this.inventory.push(item);
	}
}

Inventory.prototype.remove = function(item){
	if(item == this.weapon) this.weapon = null;
	else if(item == this.armor) this.armor = null;
	else {
		var idx = this.inventory.indexOf(item);
		this.inventory.splice(idx,1);
	}
}

Inventory.prototype.GetWeaponDamage = function(baseDamage){
	return this.weapon ? this.weapon.damage : 0;
}

Inventory.prototype.GetArmorProtection = function(baseArmor) {
	return this.armor ? this.armor.protection : 0;
}

Inventory.prototype.getById = function(id) {
	for(var idx in this.inventory){
		var item = this.inventory[idx];
		if(item.itemID == id) return item;
	}
	
	return null;
}

Inventory.prototype.getByIdx = function(idx){
	return this.inventory[idx] ? this.inventory[idx] : null;
}

Inventory.prototype.changeWeapon = function(item) {
	if(item === this.weapon) return;
	
	this.inventory.push(this.weapon);
	this.weapon = item;
}

Inventory.prototype.changeArmor = function(item) {
	if(item === this.armor) return;
	
	this.inventory.push(this.armor);
	this.armor = item;
}

Inventory.prototype.SerializeMemory = function() {
	return this.memory;
}

Inventory.prototype.SerializeInventory = function() {
	var array = [];
	if(this.weapon) array.push(this.weapon);
	if(this.armor) array.push(this.armor);
	
	for(var idx in this.inventory){
		var item = this.inventory[idx];
		array.push(item.itemID);
	}
	
	return array;
}

Inventory.prototype.LoadMemory = function(memory){
	if(!memory) return;
	this.memory = memory;
}










