<?php
	require_once 'DatabaseObject.php';

	class User extends DatabaseObject{
		private $username;
		private $email;
		public $lastGame;

		public function __construct($id,$email="",$username="") {
			parent::__construct($id);
			$this->email=$email;
			$this->username=$username;
		}

		public function getEmail() {
			return $this->email;
		}

		public function getUsername() {
			return $this->username;
		}

		public function setName($name) {
			$this->username = $name;
		}

		public function setEmail($email){
			$this->email = $email;
		}

		public function getPreferedName() {
			return ($this->username != null) ? $this->username : $this->email;
		}

		static public function load($conn, $id) {
			$query = "SELECT * FROM users WHERE id=".$id." LIMIT 1";
			$result=$conn->query($query);

			$user = null;

			if($result) {
				$row = $result->fetch_array(MYSQLI_ASSOC);
				$user = new User($row['id'], $row['email'], $row['username']);
			}

			return $user;
		}
	}
?>