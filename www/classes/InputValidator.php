<?php
	define('MAX_PASS_LENGTH', 10);
	define('MAX_USERNAME_LENGTH', 10);
	define('MIN_PASS_LENGTH', 4);
	define('MIN_USERNAME_LENGTH', 4);

	require_once "DatabaseManager.php";
	require_once "Exceptions.php";

	class InputValidator {
		private $status;
		private $username;

		public function __construct() {

		}

		public function __autoload($name) {
			include_once "./" . $name . ".php";
		}


		public function checkUsername(& $username) {
			$this->username = & $username;
			//validate username
			try{
				$this->validateUsername($username);
			} catch(WrongUsernameException $exception) {
				$this->status = array("status"=>"Error", "problemMsg"=> $exception->getMessage());
				$username="";
				return false;
			}
			
			return true;
		}

		public function checkEmail(& $email) {
			//validate email
			try{
				$this->validateEmail($email);
			} catch(WrongEmailException $exception) {
				$this->status = array("status"=>"Error", "problemMsg"=> $exception->getMessage());
				$email = "";
				if($this->status) return false; //die -> no further executcion...
			} finally {
				if($this->status) {
					$this->username = $email;
				}
			}

			return true;
		}

		public function checkPasswords($pass1,$pass2) {
			try {
				$this->validatePassword($pass1, $pass2);
			} catch (WrongPasswordException $exception) {
				$this->status = array("status"=>"Error", "problemMsg"=>$exception->getMessage());
				return false;
			}

			return true;
		}

		public function response() {
			return json_encode($this->status);
			die();
		}

		static public function StaticResponse($data) {
			return json_encode($data);
			die();
		}
		
		
		public function getStatus() {
			return $this->status;
		}



		//at least 4 chars long, at most 10 chars, no special chars
		private function validateUsername(& $name) {
			if(!$name = filter_var($name, FILTER_SANITIZE_STRING)) throw new WrongUsernameException("Invalid Username.");
			else {
				if(strlen($name) < MIN_USERNAME_LENGTH)  throw new WrongUsernameException("Username is too short.");
				elseif(strlen($name) > MAX_USERNAME_LENGTH) throw new WrongUsernameException("Username is too long.");
				elseif(!$this->loginIsUnique($name, "username")) throw new WrongUsernameException("Username is not unique!");
			}

		}

		//email format
		private function validateEmail(& $email) {
			if(!$email = filter_var($email, FILTER_VALIDATE_EMAIL)) throw new WrongEmailException("Invalid email.");
			else {
				if(!$this->loginIsUnique($email,"email")) throw new WrongEmailException("Email is not unique!");
			}
		}

		//at least 4 chars, at most 10 chars
		private function validatePassword($pass1,$pass2) {
			if(strlen(trim($pass1)) < MIN_PASS_LENGTH || strlen(trim($pass2)) < MIN_PASS_LENGTH) throw new WrongPasswordException("Password is too short!");
			elseif(strlen(trim($pass1)) > MAX_PASS_LENGTH || strlen(trim($pass2)) > MAX_PASS_LENGTH) throw new WrongPasswordException("Password is too long!");
			elseif($pass1 !== $pass2) throw new WrongPasswordException("Passwords are different!");
		}

		public function loginIsUnique($login, $column) { //column = email OR username
			return DatabaseManager::getInstance()->isUnique($login,$column);
		}

	}
?>