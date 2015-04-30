/**
 * NpcController -> show npc dialog box : dialogs | actions | quests

 */

var NpcControllerTest = TestCase('NpcControllerTest');

NpcControllerTest.prototype.setUp = function() {
	var data = new GameData();
	var rawData = data.rawMapData;
	
	map = new Map(new MapFactory());
	map.ParseNpcs(rawData['npcs']);
	map.ParseMonsters(rawData['monsters']);
	map.ParseMap(rawData['room']);

	controller = new NpcController();
	controller.load(rawData['quests']);
	controller.SetMap(map);
}

NpcControllerTest.prototype.testLoad = function() {
	controller.init(map.GetPlayer(),map.GetNpcByIdx(0),null);
	assertNotNull(controller.npc);
}

NpcControllerTest.prototype.testAddQuests = function() {
	var player = map.GetPlayer();
	var npc = map.GetNpcByIdx(0);
	controller.init(player,npc,null);
	//player click on npc : new quest is added if new
	var quest = controller.AddQuest(0); 
	
	assertNotNull(quest);
	assertEquals(1, quest.GetID());
	assertEquals("kill_monster", quest.GetType());
	assertEquals(100, quest.GetRewardGold());
	
	assertNotNull(player.ActiveQuest);
	assertEquals(player.ActiveQuest, quest);
	
	//add same quest -> get null
	assertNull(controller.AddQuest(0));
}

NpcControllerTest.prototype.test1 = function() {
	assertTrue(true);
}