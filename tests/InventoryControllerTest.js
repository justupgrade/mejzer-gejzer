var InventoryControllerTest = TestCase('InventoryControllerTest');

InventoryControllerTest.prototype.setUp = function() {
	var data = new GameData();
	var rawData = data.rawMapData;
	
	factory = new ItemFactory();
	
	map = new Map(new MapFactory());
	map.ParseNpcs(rawData['npcs']);
	map.ParseMonsters(rawData['monsters']);
	map.ParseMap(rawData['room']);
	
	controller = new InventoryController();
	player = map.GetPlayer();
	controller.SetPlayer(player);
}

InventoryControllerTest.prototype.testAddItem = function() {
	//add item from -> chest / monster drop / reward into inventory
	var options = {"type":"weapon", "damage":1, "item_id": 1};
	var item = factory.create(options); 
	controller.addItem(item);
	//add item and automatically wear it (if current is null), so player stats are updated...
	assertEquals(item, controller.GetCurrentWeapon());
	assertEquals(player.strength + item.damage, player.GetAttack());
}

InventoryControllerTest.prototype.testRemoveItem = function() {
	var options = {"type":"weapon", "damage":1, "item_id": 1};
	var item = factory.create(options); 
	controller.addItem(item);
	
	controller.removeItem(item);
	assertEquals(null, controller.GetCurrentWeapon());
	assertEquals(player.strength, player.GetAttack());
}

InventoryControllerTest.prototype.testFindItem = function() {
	var options = {"type":"weapon", "damage":1, "item_id": 1};
	var item1 = factory.create(options);
	
	controller.addItem(item1);
	
	var options = {"type":"weapon", "damage":1, "item_id": 2};
	var item2 = factory.create(options); 
	
	controller.addItem(item2);
	
	assertEquals(item1, controller.GetCurrentWeapon());
	assertEquals(item2, controller.FindItemById(item2.itemID));
	assertNull(controller.FindItemById(111111100)); //non existing id
}

InventoryControllerTest.prototype.testGetItem = function() {
	//? already tested?
}

//move item from place to place -> very useful funciton =D
InventoryControllerTest.prototype.testMoveItem = function() {
	var options = {"type":"weapon", "damage":1, "item_id": 1};
	var item1 = factory.create(options);
	
	controller.addItem(item1);
	
	options = {"type":"weapon", "damage":2, "item_id": 2};
	var item2 = factory.create(options); 
	
	controller.addItem(item2);
	
	controller.changeWeapon(item2);
	
	assertEquals(player.strength + item2.damage, player.GetAttack());
	
	options = {"type":"armor", "protection":1, "item_id": 3};
	var armor1 = factory.create(options);
	options = {"type":"armor", "protection":2, "item_id": 4};
	var armor2 = factory.create(options);
	
	controller.addItem(armor1);
	controller.addItem(armor2);
	
	controller.changeArmor(armor2);
	
	assertEquals(player.armor + armor2.protection, player.GetArmor());
}

//put item in slot -> update player skills / armor
InventoryControllerTest.prototype.testWearItem = function() {
	controller.addItem(factory.create({"type":"armor", "protection":1, "item_id": 3}));
	controller.addItem(factory.create({"type":"armor", "protection":2, "item_id": 4}));
	controller.addItem(factory.create({"type":"weapon", "damage":2, "item_id": 2}));
	controller.addItem(factory.create({"type":"weapon", "damage":1, "item_id": 1}));
	
	controller.wearItem(controller.FindItemById(4)); //put on better armor
	controller.wearItem(controller.FindItemById(1)); //put on old weapon
	
	assertEquals(player.strength + 1, player.GetAttack());
	assertEquals(player.armor + 2, player.GetArmor());
}