/**
 * require: player vs enemy (monster)
 * require: some window to show log... (action history) -> for now console.log
 * 
 */

CombatTest = TestCase('CombatTest');

CombatTest.prototype.setUp = function() {
	player = new Player(); //5str 2def 10arm hp10
	enemy = new MeleEnemy(); //3str 2def 5arm hp5
	
	combat = new CombatController();
	combat.init(player,enemy);
}

CombatTest.prototype.testSolveTurn = function() {
	combat.solveTurn();
	
	assertEquals(9, combat.GetPlayer().armor);
	assertEquals(2, combat.GetEnemy().armor);
	
	//second turn:
	
	combat.solveTurn();
	
	assertEquals(0, combat.GetEnemy().armor);
	assertEquals(4, combat.GetEnemy().currentHP);
	
	assertEquals(8, combat.GetPlayer().armor);
	
	//third turn:
	
	combat.solveTurn();
	assertEquals(1, combat.GetEnemy().currentHP);
	assertEquals(7, combat.GetPlayer().armor);
	
	//fourth turn:
	
	combat.solveTurn();
	assertFalse(combat.GetEnemy().isAlive());
	assertEquals(7, combat.GetPlayer().armor);
}

CombatTest.prototype.testEnemyVsPlayer = function() {
	combat.EnemyAttacksPlayer();
	
	assertEquals(9, combat.GetPlayer().armor);
}

CombatTest.prototype.testPlayerVsEnemy = function() {
	combat.PlayerAttacksEnemy();
	
	assertEquals(2, combat.GetEnemy().armor);
}