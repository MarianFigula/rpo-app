<?php

include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Advertisement/Repository/AdvertisementRepository.php';

use Advertisement\Repository\AdvertisementRepository;
use config\Database;


$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "PUT") {
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

    if (!isset($data["id"]) || !isset($data["text"])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "The required fields are missing"
        ]);
    }

    $database = new Database();
    $advertisementRepository = new AdvertisementRepository($database);


    $isAdvertisementUpdated = $advertisementRepository->updateAdvertisementById($data);

    if (!$isAdvertisementUpdated) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "An error occurred please try again"
        ]);
        return;
    }


    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Advertisement was updated successfully"
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "An error occurred: " . $e->getMessage()
    ]);
}