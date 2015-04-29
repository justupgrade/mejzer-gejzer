<?php
/**
 * Created by PhpStorm.
 * User: tomasz
 * Date: 26.04.15
 * Time: 13:24
 */
    require_once '../classes/Map.php';

    $lvl = isset($_POST['lvl']) ? $_POST['lvl'] : 0;
    $map = new Map($lvl);
    $map->load();
    echo json_encode($map->getLevel($lvl));
    die();
?>