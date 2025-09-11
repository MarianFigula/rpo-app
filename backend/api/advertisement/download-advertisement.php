<?php

include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Advertisement/Repository/AdvertisementRepository.php';
include_once '../../Advertisement/TemplateBuilder/PDFTemplateBuilder.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Advertisement\TemplateBuilder\PDFTemplateBuilder;
use Mpdf\Mpdf;
use Mpdf\Output\Destination;

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
        throw new Exception('Invalid JSON data');
    }

    if (!isset($advertisement['text']) || !isset($advertisement['company'])) {
        throw new Exception('Missing required advertisement data');
    }


    $mpdf = new Mpdf([
        'format' => 'A4',
        'margin_left' => 20,
        'margin_right' => 20,
        'margin_top' => 30,
        'margin_bottom' => 20,
        'orientation' => 'P'
    ]);

    $mpdf->SetTitle('Advertisement - ' . $advertisement['company']['name']);
    $mpdf->SetAuthor($advertisement['company']['name']);

    $builder = new PDFTemplateBuilder();

    $html = $builder->buildAdvertisementHTML($advertisement);

    $mpdf->WriteHTML($html);

    $filename = 'advertisement_' . date('Y-m-d_H-i-s') . '_' . $advertisement['company']['name'] . '.pdf';

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
