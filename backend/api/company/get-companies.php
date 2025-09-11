<?php
include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Company/Repository/CompanyRepository.php';
include_once '../../utils/InputSanitizer.php';

use Company\Repository\CompanyRepository;
use config\Database;
use utils\InputSanitizer;

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

    $query = InputSanitizer::sanitizeString($_GET['query']);

    if (empty($query)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Query parameter is required"
        ]);
        exit();
    }

    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

    if ($limit <= 0 || $limit > 100) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Limit must be between 1 and 100"
        ]);
        exit();
    }

    $database = new Database();
    $companyRepository = new CompanyRepository($database);

    $companies = $companyRepository->getByNameOrIco($query, $limit);

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Companies retrieved successfully",
        "data" => [
            "query" => $query,
            "limit" => $limit,
            "count" => count($companies),
            "companies" => $companies
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "An error occurred: " . $e->getMessage()
    ]);
}