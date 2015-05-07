<?php
	require_once 'DBObject.php';
	
	class Admin extends DBObject {
		protected $id;
		protected $email;
		
		static protected $table = 'admins';
		
		protected function __construct($id,$email) {
			$this->id = $id;
			$this->email = $email;
		}
		
		static protected function CreateFromArray($data) {
			return new Admin($data['id'], $data['email']);
		}
		
		//----------- methods -----------------
		static public function Authenticate($email,$password) {
			$query = "SELECT * FROM " . self::$table . " WHERE email='".$email."'";
			
			if(($hashed = self::$connection->query($query)))  {
				$data = $hashed->fetch_assoc();
				if(password_verify($password, $data['pass'])) {
					return self::CreateFromArray($data);
				}
			}
			
			return null;
		}
		
		public function changePassword($newPass){
			$query = "UPDATE admins SET pass='" . self::getHashedPassword($newPass) . "' WHERE id=" . $this->id;
				
			return self::$connection->query($query);
		}
		
		static private function getHashedPassword($password) {
			$options = array(
					'cost' => 5,
					'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM)
			);
		
			return password_hash($password, PASSWORD_BCRYPT, $options);
		}
		
		
		
		//-------------- CRUD --------------------
		static public function Create($email,$password) {
			$columns = array('email', 'pass');
			$values = array($email, self::getHashedPassword($password));
			
			if(($id = parent::Create($columns, $values)) !== null) {
				return new Admin($id,$email);
			}
			
			return null;
		}
		
		static public function Update($user) {
			$columns = array('email');
			$values = array($user->getEmail());
				
			return parent::Update($columns,$values, $user->getID());
		}
		
		//-------------------- get set -------------------------
		public function setEmail($new) { $this->email = $new; }
		
		public function getID() { return $this->id;}
		public function getEmail() { return $this->email; }
		
	}
?>