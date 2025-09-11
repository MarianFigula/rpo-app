<?php

include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Advertisement/Repository/AdvertisementRepository.php';

use Advertisement\Repository\AdvertisementRepository;
use config\Database;

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "DELETE") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only POST is permitted."
    ]);
    exit();
}


try {

    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    if (!isset($data) || !isset($data["id"])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "The required fields are missing"
        ]);
    }

    $database = new Database();
    $advertisementRepository = new AdvertisementRepository($database);

    $isAdvertisementRemoved = $advertisementRepository->deleteAdvertisementById($data);

    if (!$isAdvertisementRemoved) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "An error occurred please try again"
        ]);
        return;
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Advertisement was removed successfully"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "An error occurred: " . $e->getMessage()
    ]);
}