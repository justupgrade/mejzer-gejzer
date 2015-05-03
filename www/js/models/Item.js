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
}

function Armor(options) {
	this.type = "armor";
	this.itemID = options.id;
	this.protection = options.protection;
	this.name = options.item_name;
}

function Book(options) {
	this.wearable = false;
	this.type = "special";
	this.name = options.item_name;
}

function QuestItem(options){
	this.wearable = false;
	this.type = "quest";
	this.itemID = options.id;
	this.name = options.item_name;
}

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;
//Weapon.prototype.parent = Item.prototype;

Armor.prototype = new Item();
Armor.prototype.constructor = Armor;

Book.prototype = new Item();
Book.prototype.constructor = Book;

QuestItem.prototype = new Item();
QuestItem.prototype.constructor = QuestItem;