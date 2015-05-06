<?php
	class DatabaseObject {
		protected $id;

		public function __construct($id) {
			$this->id=$id;
		}

		public function getID() {
			return $this->id;
		}
	}
?>