/**
 * create item by type
 */

function ItemFactory() {
	
	this.create = function(options){
		var ParentClass = null;
		
		if(options.type === "weapon"){
			ParentClass = Weapon;
		} else if(options.type === "armor") {
			ParentClass = Armor;
		} else if(options.type === "book") {
			ParentClass = Book;
		} else if(options.type === "quest") {
			ParentClass = QuestItem;
		}
		
		if( ParentClass === null) return null;
		
		return new ParentClass(options);
	}
}

