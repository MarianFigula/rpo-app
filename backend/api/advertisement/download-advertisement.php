<?php

include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Advertisement/Repository/AdvertisementRepository.php';
include_once '../../Advertisement/TemplateBuilder/PDFTemplateBuilder.php';
include_once '../../utils/InputSanitizer.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Advertisement\TemplateBuilder\PDFTemplateBuilder;
use Mpdf\Mpdf;
use Mpdf\Output\Destination;
use utils\InputSanitizer;

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "POST") {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only POST is permitted."
    ]);
    exit();
}

try {
    $input = file_get_contents('php://input');
    $advertisement = json_decode($input, true);

    if (!$advertisement) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode([
            "success" => false,
            "message" => "Invalid JSON data"
        ]);
        exit();
    }

    if (!isset($advertisement['text']) || !isset($advertisement['company'])) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode([
            "success" => false,
            "message" => "Missing required advertisement data"
        ]);
        exit();
    }

    $sanitizedData = InputSanitizer::sanitizeArray($advertisement);

    $mpdf = new Mpdf([
        'format' => 'A4',
        'margin_left' => 20,
        'margin_right' => 20,
        'margin_top' => 30,
        'margin_bottom' => 20,
        'orientation' => 'P'
    ]);

    $mpdf->SetTitle('Advertisement - ' . $sanitizedData['company']['name']);
    $mpdf->SetAuthor($sanitizedData['company']['name']);

    $builder = new PDFTemplateBuilder();

    $html = $builder->buildAdvertisementHTML($sanitizedData);

    $mpdf->WriteHTML($html);

    $filename = 'advertisement_' . date('Y-m-d_H-i-s') . '_' . $sanitizedData['company']['name'] . '.pdf';

    $mpdf->Output($filename, Destination::DOWNLOAD);

    echo json_encode([
        'success' => true,
        'message' => 'PDF generated successfully'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
