/**
 * 
 */

function GameLoader() {
	this.playerDataLoaded = false;
	this.playerData = null;
	this.itemMemory = null;
	this.items = null;
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
	if(e.target.responseText != ""){
		var response = JSON.parse(e.target.responseText);
		e.target.self.playerData = response['stats'];
		e.target.self.itemMemory = response['memory'];
		e.target.self.items = response['items'];
	}
	e.target.self.playerDataLoaded = true;
}

GameLoader.prototype.GetPlayerStats = function() {
	return this.playerData;
}

GameLoader.prototype.GetItems = function() {
	return this.items;
}

GameLoader.prototype.GetItemMemory = function() {
	return this.itemMemory;
}