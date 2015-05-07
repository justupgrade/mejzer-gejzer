<?php
	abstract class DBObject {
		static protected  $connection = null;
		
		static public function SetUpConnection($connection){
			self::$connection = $connection;
		}
		
		// ----------- static all -------------
		//required for late static binding!
		abstract static protected function CreateFromArray($data);
		
		//USES LATE STATIC BINDING!
		static public function GetAll(){
			$query = "SELECT * FROM " . static::$table;

			$data = self::$connection->query($query);
				
			if($data) {
				$results = array();
				while($row = $data->fetch_assoc()){
					$results[] = static::CreateFromArray($row);
				}
			
				return $results;
			}
				
			return null;
		}
		
		//-------------- CRUD --------------------
		static public function Create($columns,$values) {
			$length = count($columns);
			
			$query = "INSERT into " . static::$table . " (";
			foreach($columns as $colID => $column) {
				$query .= $column; 
				if($colID < $length -1 ) $query .= ",";
				else $query .= ") VALUES (";
			}
			
			foreach($values as $valueID => $value){
				$query .= self::convert($value);
				if($valueID < $length-1) $query .= ", ";
				else $query .= ")";
			}
			
		//	trigger_error($query);
			
			if(self::$connection->query($query)){
				return self::$connection->insert_id;
			}
			
			return null;
		}
		
		static private function convert($str){
			if($str === null || $str === "") return "''";
			return (is_string($str)) ? "'".$str."'" : $str;
		}
		
		static public function Load($id) {
			$query = "SELECT * FROM " . static::$table . " WHERE id=".$id;
			
			$data = self::$connection->query($query);
			if(($data=$data->fetch_assoc())) {
				return static::CreateFromArray($data);
			}
			return null;
		}
		
		static protected function LoadArray($id) {
			$query = "SELECT * FROM " . static::$table . " WHERE item_id=".$id;
				
			$data = self::$connection->query($query);
				
			if($data && $data->num_rows > 0) {
				$result = array();
				while($row = $data->fetch_assoc()){
					$result[] = static::CreateFromArray($row);
				}
				return $result;
			}
				
			return null;
		}
		
		static public function Update($columns,$values,$ID) {
			$length = count($columns);
			
			$query = "UPDATE " . static::$table . " SET";
			
			for($i=0;$i<$length;$i++) {
				$query .= " " . $columns[$i] . "=" . self::convert($values[$i]);
				if($i < $length-1) $query .= ', ';
				else $query .= " WHERE id=" . $ID;
			}
			//trigger_error($query);
			return self::$connection->query($query);
		}
		
		static public function Delete($id) {
			$query = "DELETE  FROM " . static::$table . " WHERE id=" . $id;
			self::$connection->query($query);
			return mysqli_affected_rows(self::$connection);
		}
	}
?>