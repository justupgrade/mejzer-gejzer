function Item(options) {
	this.wearable = true;
	this.type = null;
	this.name = null;
	
	this.GetType = function() {
		return this.type;
	}
	
	this.GetName = function() {
		return this.name;
	}
}

function Weapon(options) {
	this.type = "weapon";
	this.damage = options.damage;
	this.itemID = options.id;
	this.name = options.item_name;
	
	this.GetDetailsDescriptor = function() {
		return {
			"type": this.type,
			"name": this.name,
			"damage": this.damage
		};
	}
}

function Armor(options) {
	this.type = "armor";
	this.itemID = options.id;
	this.protection = options.protection;
	this.name = options.item_name;
	
	this.GetDetailsDescriptor = function() {
		return {
			"type": this.type,
			"name": this.name,
			"protection": this.protection
		};
	}
}

function Book(options) {
	this.wearable = false;
	this.type = "special";
	this.name = options.item_name;
	
	this.GetDetailsDescriptor = function() {
		return {
			"type": this.type,
			"name": this.name
		};
	}
}

function QuestItem(options){
	this.wearable = false;
	this.type = "quest";
	this.itemID = options.id;
	this.name = options.item_name;
	
	this.GetDetailsDescriptor = function() {
		return {
			"type": this.type,
			"name": this.name
		};
	}
}

function FoodItem(options){
	this.wearable = false;
	this.useable = true;
	this.hpRestore = options.hp_restore;
	this.type = "food";
	this.itemID = options.id;
	this.name = options.item_name;
	
	this.GetDetailsDescriptor = function() {
		return {
			"type":this.type,
			"name":this.name,
			"hp_restore": this.hpRestore
		};
		
	};
}

FoodItem.prototype = new Item();
FoodItem.prototype.constructor = FoodItem;

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;
//Weapon.prototype.parent = Item.prototype;

Armor.prototype = new Item();
Armor.prototype.constructor = Armor;

Book.prototype = new Item();
Book.prototype.constructor = Book;

QuestItem.prototype = new Item();
QuestItem.prototype.constructor = QuestItem;