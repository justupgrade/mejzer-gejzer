/**
 * 
 */

function GameLoader() {
	this.playerDataLoaded = false;
	this.playerData = null;
	
}

GameLoader.prototype.LoadPlayer = function() {
	var xhr = new XMLHttpRequest();
	xhr.self = this;
	xhr.addEventListener('load', this.onPlayerDataLoaded);
	xhr.open('POST', 'actions/load_player_data.php');
	xhr.send(null);
}

GameLoader.prototype.isLoaded = function() {
	return this.playerDataLoaded;
}

GameLoader.prototype.onPlayerDataLoaded = function(e) {
	e.target.self.playerData = JSON.parse(e.target.responseText);
	e.target.self.playerDataLoaded = true;
}

GameLoader.prototype.GetPlayerStats = function() {
	return this.playerData;
}