/**
 * 
 */

MapBlockTest = TestCase('MapBlockTest');

MapBlockTest.prototype.testNullGateImage = function() {
	var gate = new Gate();
	assertNull(gate.ImageRepository);
}