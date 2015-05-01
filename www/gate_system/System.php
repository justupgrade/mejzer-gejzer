<?php
	require_once "Room.php";
	require_once "pathfinder/Grid.php";
	require_once "pathfinder/Pathfinder.php";
	
	define('SMALL_WIDTH', 7);
	define('SMALL_HEIGHT', 7);
	
	class System {
		public $cols;
		public $rows;
		
		private $gates;
		private $center;
		private $rooms;
		
		public function __construct($cols=SMALL_WIDTH, $rows=SMALL_HEIGHT){
			$this->cols = $cols;
			$this->rows = $rows;
		}
		
		public function generate() {
			$this->rooms = array();
			$this->gates = $this->generateGates();
			$this->center = $this->generateCenter();
			//create connection with center for each gate:
			
			foreach($this->gates as $gate){
				$path = $this->generatePath($gate);
				foreach($path as $tileIDX => $tile){
					foreach($this->rooms as $room) {
						if($tile->getCol() === $room->getCol() && $tile->getRow() === $room->getRow()) array_splice($path,$tileIDX,1);
					}
				}
				
				$this->rooms = array_merge($this->rooms,$path);
			}
				
		}
		
		public function generatePath($gate) {
			$grid = new Grid($this->cols,$this->rows);
			$grid->generate();
			$pathfinder = new Pathfinder();
			$pathfinder->setGrid($grid);
			$pathfinder->setStart($gate->col, $gate->row);
			$pathfinder->setFinish($this->center->col, $this->center->row);
			
			return $pathfinder->findPath();
		}
		
		public function generateCenter() {
			return new Room(
					intval(round($this->cols/2,0,PHP_ROUND_HALF_DOWN)), 
					intval(round($this->rows/2,0,PHP_ROUND_HALF_DOWN))
			);
		}
		
		public function generateGates() {
			//left, top, right, bottom
			$maxCol = $this->cols-1;
			$maxRow = $this->rows-1;
			
			$left 	= new Room(0,					rand(2,$maxRow-2));
			$top 	= new Room(rand(2,$maxCol-2),	0);
			$right 	= new Room($maxCol,				rand(2,$maxRow-2));
			$bottom = new Room(rand(2,$maxCol-2),	$maxRow);
				
			return array($left, $top, $right, $bottom);
		}
		
		// --------------- save to json -------------------
		public function serializeSystem() {
			$array = array();
			
			for($i = 0; $i < $this->rows; $i++){
				
				$row = array();
				for($j = 0; $j < $this->cols; $j++){
					$row[] = null;
				}
				
				$array[] = $row;
			}
			
			foreach($this->gates as $gate){
				$array[$gate->row][$gate->col] = array("type"=>"gate", "col"=>$gate->col, "row"=>$gate->row);
			}
			
			foreach($this->rooms as $room){
				$array[$room->getRow()][$room->getCol()] = array("type"=>"room", "col"=>$room->getCol(), "row"=>$room->getRow());
			}
			
			$array[$this->center->row][$this->center->col] = 
				array("type"=>"center", "col"=>$this->center->col, "row"=>$this->center->row);
			
			return $array;
		}
		
		//--------------- get / set ---------------------
		public function getRooms() {
			return $this->rooms;
		}
		
		public function getCenter() {
			return $this->center;
		}
		
		public function getGates() {
			return $this->gates;
		}
	}
?>