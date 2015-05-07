<?php
	class Map {
		private $tiles;
		private $cols;
		private $rows;
		private $monsterLvl;
		
		public $monsters;
		public $items;
		public $npcs;
		public $quests;
		
		public $lvl;
		
		public $RawTiles; //test purposes ? easier with array; no need for MapCell()?
		
		static public $row_limit = 15;
		static public $col_limit = 20;
		
		public function __construct($cols,$rows,$mLVL) {
			$this->tiles = array();
			$this->cols = intval($cols);
			$this->rows = intval($rows);
			$this->monsterLvl = intval($mLVL);
		}
		
		static public function ParseFromRaw($raw){
			//var_dump($raw);
			$map = new Map(count($raw['room'][0]), count($raw['room']), 1);
			$map->RawTiles = $raw['room'];
			$map->monsters = $map->parseMonsters($raw['monsters']);
			$map->npcs = $map->parseNpcs($raw['npcs']);
			$map->quests = $raw['quests'];
			$map->items = $map->parseItems($raw['items_in_room']);
			
			return $map;
		}
		
		public function parseItems($raw){
			$array = array();
			foreach($raw as $item){
				$array[] = array(
						"col"=> $item['col'],
						"row"=> $item['row'],
						"id"=>$item['id']
				);
			}
		
			return $array;
		}
		
		public function parseNpcs($raw){
			$array = array();
			foreach($raw as $npc){
				$array[] = array(
						"type"=> $npc['type'],
						"col"=> $npc['col'],
						"row"=> $npc['row'],
						"id"=>$npc['id']
				);
			}
				
			return $array;
		}
		
		public function parseMonsters($raw){
			$array = array();
			foreach($raw as $monster){
				$array[] = array(
					"type"=> $monster['type'],
					"lvl"=> $monster['lvl'],
					"col"=> $monster['col'],
					"row"=> $monster['row'],
					"id"=>$monster['id']
				);
			}
			
			return $array;
		}
		
		/*
		 * generate empty map:
		 * wall around + random gates
		 */
		public function generate() {
			$this->monsters = [];
			$this->items = [];
			$this->npcs = [];
			$this->quests = [];
			
			$this->RawTiles = array();
			
			
			for($row = 0; $row < $this->rows; $row++){
				$array = array();
				$RawArray = array();
				for($col = 0; $col < $this->cols; $col++){
					
					if($row === 0 || $row === $this->rows-1) { //first last row -> walls
						$RawArray[] = 2;
					}elseif($col === 0 || $col === $this->cols-1){ //first last col -> walls
						$RawArray[] = 2;
					} else { //empty tile
						$RawArray[] = 0;
					}
					
					$array[] = null;
				}
				
				$this->RawTiles[] = $RawArray;
				$this->tiles[] = $array;
			}
			
			$this->addGates();
		}
		
		private function addGates() {
			//add 4 gates...
			//$randomRow = rand(1, $this->cols-2);
			//$randomCol = rand(1, $this->rows-2);
			
			//leftGate:
			$this->RawTiles[rand(2, $this->rows-3)][0] = 1;
			//rightGate:
			$this->RawTiles[rand(2, $this->rows-3)][$this->cols-1] = 1;
			//topGate:
			$this->RawTiles[0][rand(2, $this->cols-3)] = 1;
			//bottomGate:
			$this->RawTiles[$this->rows-1][rand(2, $this->cols-3)] = 1;
		}

		//adds column ON specified IDX
		public function addCol($colNr=1) {
			if($colNr < self::$col_limit){
				
			}
		}
		
		public function addRow($rowNr=1){
			if($rowNr < self::$rowLimit) {
				
			}
		}
		
		public function update($col,$row,$newType) {
			$oldType = $this->RawTiles[$row][$col];
			if($oldType == 3) { //monster -> remove from monsters array
				$this->removeMonster($col,$row);
			} elseif($oldType == 4){ //npc / quest
				$this->removeNpc($col,$row);
			} elseif($oldType == 5) { //item
				$this->removeItem($col,$row);
			}
			
			$this->RawTiles[$row][$col] = $newType;
			if($newType == 3) { //add monster
				$this->addMonster($col,$row);
			} elseif($newType == 4){ //npc / quest
				$this->addNpc($col,$row);
			} elseif($newType == 5) { //item
				$this->addItem($col,$row);
			}
		}
		
		public function addMonster($col,$row) {
			$monster = $this->buildMonster($col, $row);
			$this->monsters[] = $monster;
		}
		
		public function addNpc($col,$row){
			$npc = $this->buildNpc($col,$row);
			$this->npcs[] = $npc;
		}
		
		public function addItem($col,$row){
			$item = $this->buildItem($col,$row);
			$this->items[] = $item;
		}
		
		public function removeMonster($col,$row) {
			foreach($this->monsters as $idx => $monster){
				if($monster["col"] == $col && $monster["row"] == $row){
					unset($this->monsters[$idx]);
					break;
				}
			}
		}
		//remove npc and quests...
		public function removeNpc($col,$row) {
			foreach($this->npcs as $idx => $npc){
				if($npc["col"] == $col && $npc["row"] == $row){
					unset($this->npcs[$idx]);
					break;
				}
			}
		}
		
		public function removeQuest($col,$row) {
			foreach($this->quests as $idx => $quest){
				if($quest["col"] == $col && $quest["row"] == $row){
					unset($this->quests[$idx]);
					break;
				}
			}
		}
		
		public function removeItem($col,$row) {
			foreach($this->items as $idx => $item){
				if($item["col"] == $col && $item["row"] == $row){
					unset($this->items[$idx]);
					break;
				}
			}
		}
		
		public function buildMonster($col,$row) {
			return array(
				"type"=>"mele",
				"lvl"=>$this->monsterLvl,
				"col"=>$col,
				"row"=>$row
			);
		}
		
		public function buildItem($col,$row){
			return array(
					"col"=>$col,
					"row"=>$row
			);
		}
		
		public function buildNpc($col,$row){
			return array(
					"type"=>"npc",
					"col"=>$col,
					"row"=>$row
			);
		}
		
		public function getHtml() {
			$out = "<div class='map' id='mapID'>";
			
			$map_row_width = $this->cols * 30;
			
			for($row = 0; $row < $this->rows; $row++){
				$out .= "<div class='map-row' style='width:" . $map_row_width . "px;'>";
				for($col = 0; $col < $this->cols; $col++){
					$type = $this->RawTiles[$row][$col];
					$id = "id".$col."id".$row;
					$out .= "<div id='{$id}' class='map-cell type{$type}'>$type</div>";
				}
				$out .= "</div>";
			}
			
			$out .= "</div>";
			
			return $out;
		}
		
		public function getLastRow() {
			return $this->rows-1;
		}
		
		public function getLastCol() {
			return $this->cols-1;
		}
		
		public function getTiles() {
			return $this->RawTiles;
		}
		
		//0- empty, 1- gate, 2 - wall, 3 - monster, 4 - item, 5 - quest, 6 - player
		public function addWall($col,$row){
			//$cell = new MapCell($col,$row, 2);
			
		}
		
		private function prepareMonsters() {
			for($i = 0; $i < count($this->monsters); $i++) {
				$this->monsters[$i]["id"] = $i;
			}
			
			return $this->monsters;
		}
		
		private function prepareNpcs() {
			for($i = 0; $i < count($this->npcs); $i++) {
				$this->npcs[$i]["id"] = $i;
			}
				
			return $this->npcs;
		}
		
		private function prepareItems() {
			for($i = 0; $i < count($this->items); $i++) {
				$this->items[$i]["id"] = $i; //change that id to something elese...
			}
				
			return $this->items;
		}
		
		public function save() {
			$output = array();
			$output["room"] = $this->RawTiles;
			$output["monsters"] = $this->prepareMonsters();
			$output["npcs"] = $this->prepareNpcs();
			$output["quests"] = $this->quests;
			$output["items_in_room"] = $this->prepareItems();
			
			file_put_contents("new_lvl.json", json_encode($output, JSON_PRETTY_PRINT));
		}
		
		public function GetWidth() {
			return $this->cols;
		}
		
		public function GetHeight() {
			return $this->rows;
		}
		
		public function GetMonsterLvl() {
			return $this->monsterLvl;
		}
		
		
		
		
		
	}