<?php
require_once '../config/Database.php';
require_once '../RPODataPopulator/RPODataPopulator.php';

use config\Database;
use RPODataPopulator\RPODataPopulator;


try {
    $database = new Database();
    $db = $database->getConnection();

    $populator = new RPODataPopulator($db);
    $populator->populateData();

} catch (Exception $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
