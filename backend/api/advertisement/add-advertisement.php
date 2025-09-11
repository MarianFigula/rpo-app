<?php
include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Advertisement/Repository/AdvertisementRepository.php';
include_once '../../Company/Repository/CompanyRepository.php';
include_once '../../utils/InputSanitizer.php';

use Advertisement\Repository\AdvertisementRepository;
use Company\Repository\CompanyRepository;
use config\Database;
use utils\InputSanitizer;

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only POST is permitted."
    ]);
    exit();
}

try {

    $requiredFields = [
        "company_id", "text", "company_name", "company_ico",
        "company_street", "company_building_number", "company_postal_code",
        "company_city", "company_country"
    ];

    $sanitizedData = [];

    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "The required field '$field' is missing"
            ]);
            exit();
        }
        $sanitizedData[$field] = InputSanitizer::sanitizeString($_POST[$field]);
    }

    $img_url = null;
    if (isset($_FILES['logo'])) {
        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        $allowedExtensions = ['jpg', 'jpeg', 'png'];
        $maxFileSize = 2 * 1024 * 1024;

        $fileType = $_FILES['logo']['type'];
        $fileSize = $_FILES['logo']['size'];
        $fileExtension = strtolower(pathinfo($_FILES["logo"]["name"], PATHINFO_EXTENSION));

        if ($fileSize > $maxFileSize) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "File size exceeds 2MB limit. Current size: " . round($fileSize / 1024 / 1024, 2) . "MB"
            ]);
            exit();
        }

        if (!in_array($fileExtension, $allowedExtensions) || !in_array($fileType, $allowedTypes)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Invalid file format. Only PNG and JPEG files are allowed."
            ]);
            exit();
        }

        $targetDir = '../../public/logos/';
        $uniqueFilename = time() . '_' . rand(1000, 9999) . '.' . $fileExtension;
        $targetFile = $targetDir . $uniqueFilename;
        $img_url = "/logos/" . $uniqueFilename;

        if (!move_uploaded_file($_FILES["logo"]["tmp_name"], $targetFile)) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Failed to upload image."
            ]);
            exit();
        }
    }

    $database = new Database();
    $advertisementRepository = new AdvertisementRepository($database);
    $companyRepository = new CompanyRepository($database);

    $companyData = [
        "company_name" => $sanitizedData["company_name"],
        "company_ico" => $sanitizedData["company_ico"],
        "company_street" => $sanitizedData["company_street"],
        "company_building_number" => $sanitizedData["company_building_number"],
        "company_postal_code" => $sanitizedData["company_postal_code"],
        "company_city" => $sanitizedData["company_city"],
        "company_country" => $sanitizedData["company_country"],
        "company_logo_url" => $img_url
    ];

    $company_id = $sanitizedData['company_id'];
    $isNewCompany = empty($company_id);

    if ($isNewCompany) {
        $company_id = $companyRepository->addCompany($companyData);
        if ($company_id === false) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "An error occurred when adding new company"
            ]);
            exit();
        }
        $company_id = (int) $company_id;
    } else {
        $company_id = (int) $company_id;
        $companyData['company_id'] = $company_id;

        $isCompanyUpdated = $companyRepository->updateCompanyById($companyData);
        if (!$isCompanyUpdated) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "An error occurred when updating company"
            ]);
            exit();
        }
    }

    $advertisementData = [
        'company_id' => $company_id,
        'text' => $sanitizedData["text"]
    ];

    $isAdvertisementAdded = $advertisementRepository->addAdvertisement($advertisementData);
    if (!$isAdvertisementAdded) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "An error occurred when adding new advertisement"
        ]);
        exit();
    }

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Advertisement was added successfully"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "An error occurred: " . $e->getMessage()
    ]);
}