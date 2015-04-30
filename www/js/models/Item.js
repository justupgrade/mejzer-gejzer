function Item(options) {
	this.wearable = true;
	this.type = null;
}

function Weapon(options) {
	this.type = "weapon";
	this.damage = options.damage;
	this.itemID = options.item_id;
}

function Armor(options) {
	this.type = "armor";
	this.itemID = options.item_id;
	this.protection = options.protection;
}

function Book(options) {
	this.wearable = false;
	this.type = "special";
}

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;
//Weapon.prototype.parent = Item.prototype;

Armor.prototype = new Item();
Armor.prototype.constructor = Armor;

Book.prototype = new Item();
Book.prototype.constructor = Book;