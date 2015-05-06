<?php
	class MapCell {
		public $col;
		public $row;
		public $type;
		
		public function __construct($col,$row, $type) {
			$this->col = $col;
			$this->row = $row;
			$this->type = $type;
		}
	}
?>