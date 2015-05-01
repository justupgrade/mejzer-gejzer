/**
 * Created by tomasz on 25.04.15.
 * this file sits in www directory [main dir]
 */

//generate (or load) system first!
var xhr = new XMLHttpRequest();
xhr.open('POST', 'actions/generate_game.php');
xhr.addEventListener('load', onGameGeneratedHandler);
xhr.send(null);

function onGameGeneratedHandler(e) {
	alert(e.target.responseText);
	var game = new Main();
	game.Run();
}





