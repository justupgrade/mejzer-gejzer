/**
 * require: player vs enemy (monster)
 * require: some window to show log... (action history) -> for now console.log
 * 
 */

CombatTest = TestCase('CombatTest');

CombatTest.prototype.setUp = function() {
	player = new Player(); //5str 2def 10arm
	enemy = new MeleEnemy(); //3str 2def 5arm
	
	combat = new CombatController();
	combat.init(player,enemy);
}

CombatTest.prototype.testSolveTurn = function() {
	combat.solveTurn();
	
	assertEquals(9, combat.GetPlayer().armor);
	assertEquals(2, combat.GetEnemy().armor);
}

CombatTest.prototype.testEnemyVsPlayer = function() {
	combat.EnemyAttacksPlayer();
	
	assertEquals(9, combat.GetPlayer().armor);
}

CombatTest.prototype.testPlayerVsEnemy = function() {
	combat.PlayerAttacksEnemy();
	
	assertEquals(2, combat.GetEnemy().armor);
}