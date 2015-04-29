<?php
/**
 * Created by PhpStorm.
 * User: tomasz
 * Date: 25.04.15
 * Time: 15:52
 */
    class Map {
        private $map; //[lvl][row][col]
        private $lvlIDX;

        public function __construct($lvl) {
            $this->lvlIDX = $lvl;
        }

        public function load() {
            $this->map = json_decode(file_get_contents("../data/map.json"), true)['levels'];
            //var_dump($this->map);
        }

        public function getLevel($ID) {
            return isset($this->map[$ID]) ? $this->map[$ID] : null;
        }

        public function getTile($col,$row){
            return $this->map[$this->lvlIDX][$row][$col];
        }


    }
?>