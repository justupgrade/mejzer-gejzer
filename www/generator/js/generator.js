/*
 * 
 */
var generateBtn = document.getElementById('generateID');
generateBtn.addEventListener('click', onGenerateBtnClick);

var map = document.getElementById('mapID');
if(map){
	map.addEventListener('click', onMapClick);
}

/*
 * on block-option click:
 */

var currentType = -1;
var prevBlock = null;

var options = document.querySelectorAll('.option');
for(var idx = 0; idx < options.length; idx++){
	options[idx].addEventListener('click', changeCurrentOption);
}

function onGenerateBtnClick(e) {
	var confirmed = confirm("Are you sure? Data will be lost...");
	if(!confirmed) e.preventDefault();
}

function changeCurrentOption(e){
	if(prevBlock !== null) prevBlock.classList.remove('active-block');
	currentType = e.target.id;
	prevBlock = e.target;
	prevBlock.classList.add('active-block');
}

function onMapClick(e){
	var clickedTile = e.target;
	if(clickedTile.id !== "mapID" && currentType !== -1) {
		var prevTypeID = clickedTile.innerHTML;
		clickedTile.classList.remove('type'+prevTypeID);
		clickedTile.classList.add('type'+currentType);
		clickedTile.innerHTML = currentType;
		
		var fd = new FormData();
		fd.append('id', clickedTile.id);
		fd.append('type', currentType);
		
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('load', onMapUpdated);
		xhr.open('POST', 'actions/update_map.php');
		xhr.send(fd);
	}
}

function onMapUpdated(e){
	console.log(e.target.responseText);
}