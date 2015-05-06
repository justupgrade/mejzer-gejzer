<?php
/**
 * Created by PhpStorm.
 * User: tomasz
 * Date: 26.04.15
 * Time: 13:24
 */ 
    $raw = json_decode(file_get_contents("../data/map.json"), true);

    $lvl = isset($_POST['lvl']) ? $_POST['lvl'] : 0;
    $path = "../data/maps/lvl".$lvl.".json";
    
    echo file_get_contents($path);
    die();
?>