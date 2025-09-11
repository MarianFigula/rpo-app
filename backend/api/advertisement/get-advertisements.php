<?php

include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Advertisement/Repository/AdvertisementRepository.php';

use Advertisement\Repository\AdvertisementRepository;
use config\Database;


$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "GET") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only GET is permitted."
    ]);
    exit();
}

try {

    $database = new Database();
    $advertisementRepository = new AdvertisementRepository($database);

    $advertisements = $advertisementRepository->getAdvertisements();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Advertisements retrieved successfully",
        "data" => [
            "advertisements" => $advertisements
        ]
    ]);

}catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "An error occurred: " . $e->getMessage()
    ]);
}