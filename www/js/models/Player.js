/**
 * 
 */

function Player() {
	this.GetImage = function() {
        return this.ImageRepository.Empty;
    }
    this.GetFillStyle = function() {
        return "rgba(200,50,100,1)"; //???
    }
}

Player.prototype = new MapBlock();
Player.prototype.constructor = Player;