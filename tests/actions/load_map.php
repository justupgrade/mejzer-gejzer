<?php
/**
 * Created by PhpStorm.
 * User: tomasz
 * Date: 26.04.15
 * Time: 13:24
 */
    require_once '../../www/classes/Map.php';

    $lvl = isset($_GET['lvl']) ? $_GET['lvl'] : 0;
    $map = new Map($lvl);
    $map->load();
    echo json_encode($map->getRoom());
    die();
?>