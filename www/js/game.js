/**
 * Created by tomasz on 25.04.15.
 * this file sits in www directory [main dir]
 */


loadGame();

//generate (or load) system first!
function newGame() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'actions/generate_system.php');
	xhr.addEventListener('load', onGameGeneratedHandler);
	xhr.send(null); //send user data in future
}

function loadGame() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'actions/load_system.php');
	xhr.addEventListener('load', onGameGeneratedHandler);
	xhr.send(null); //send user data in future
}

function onGameGeneratedHandler(e) {
	var new_system_data = JSON.parse(e.target.responseText);
	var game = new Main();
	game.Run();
}





