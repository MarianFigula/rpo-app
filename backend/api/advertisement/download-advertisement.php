<?php

include_once '../../config/cors.php';
include_once '../../config/Database.php';
include_once '../../Advertisement/Repository/AdvertisementRepository.php';
require_once __DIR__ . '/../../vendor/autoload.php';

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

    $html = buildAdvertisementHTML($advertisement);

    $mpdf->WriteHTML($html);

    $filename = 'advertisement_' . date('Y-m-d_H-i-s') . '_' . sanitizeFilename($advertisement['company']['name']) . '.pdf';

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

function buildAdvertisementHTML($advertisement)
{
    $company = $advertisement['company'];
    $createdAt = formatDate($advertisement['created_at']);

    $logoHtml = '';
    if (!empty($company['logo_url'])) {
        $logoUrl = $company['logo_url']; // This is: /logos/1757591453_1453.png

        // Convert URL to file system path
        $logoPath = $_SERVER['DOCUMENT_ROOT'] . '/public' . $logoUrl;
//        var_dump($logoPath); die;
        $logoPath = '/var/www/html/public' . $logoUrl;

        $logoHtml = '<img src="' . $logoPath . '" alt="Company Logo" style="max-width: 150px; max-height: 100px; margin-bottom: 20px;">';

    }

    $address = buildAddress($company);

    $html = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                font-size: 12pt;
                line-height: 1.4;
                color: #333;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #007BFF;
                padding-bottom: 20px;
            }
            .company-name {
                font-size: 24pt;
                font-weight: bold;
                color: #007BFF;
                margin: 10px 0;
            }
            .company-info {
                background-color: #f8f9fa;
                padding: 20px;
                border-left: 4px solid #007BFF;
                margin: 20px 0;
            }
            .company-info h3 {
                margin-top: 0;
                color: #007BFF;
                font-size: 16pt;
            }
            .info-row {
                margin: 8px 0;
                display: flex;
                align-items: center;
            }
            .info-label {
                font-weight: bold;
                min-width: 100px;
                color: #666;
            }
            .advertisement-content {
                margin: 30px 0;
                padding: 25px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #ffffff;
            }
            .advertisement-content h3 {
                color: #007BFF;
                margin-top: 0;
                font-size: 18pt;
            }
            .advertisement-text {
                font-size: 14pt;
                line-height: 1.6;
                text-align: justify;
                margin: 15px 0;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                color: #666;
                font-size: 10pt;
                border-top: 1px solid #ddd;
                padding-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            ' . $logoHtml . '
            <div class="company-name">' . htmlspecialchars($company['name']) . '</div>
            <div style="color: #666; font-size: 14pt;">Advertisement</div>
        </div>

        <div class="company-info">
            <h3>Company Information</h3>
            <div class="info-row">
                <span class="info-label">Company:</span>
                <span>' . htmlspecialchars($company['name']) . '</span>
            </div>';

    if (!empty($company['ico'])) {
        $html .= '
            <div class="info-row">
                <span class="info-label">ICO:</span>
                <span>' . htmlspecialchars($company['ico']) . '</span>
            </div>';
    }

    if (!empty($address)) {
        $html .= '
            <div class="info-row">
                <span class="info-label">Address:</span>
                <span>' . htmlspecialchars($address) . '</span>
            </div>';
    }

    if (!empty($company['country'])) {
        $html .= '
            <div class="info-row">
                <span class="info-label">Country:</span>
                <span>' . htmlspecialchars($company['country']) . '</span>
            </div>';
    }

    $html .= '
        </div>

        <div class="advertisement-content">
            <h3>Advertisement Content</h3>
            <div class="advertisement-text">
                ' . nl2br(htmlspecialchars($advertisement['text'])) . '
            </div>
        </div>

        <div class="footer">
            <p>Advertisement reation date: ' . $createdAt . '</p>
        </div>
    </body>
    </html>';

    return $html;
}

function buildAddress($company)
{
    $addressParts = [];

    if (!empty($company['street'])) {
        $street = $company['street'];
        if (!empty($company['building_number'])) {
            $street .= ' ' . $company['building_number'];
        }
        $addressParts[] = $street;
    }

    if (!empty($company['postal_code']) && !empty($company['city'])) {
        $addressParts[] = $company['postal_code'] . ' ' . $company['city'];
    } elseif (!empty($company['city'])) {
        $addressParts[] = $company['city'];
    }

    return implode(', ', $addressParts);
}

function formatDate($dateString)
{
    try {
        $date = new DateTime($dateString);
        return $date->format('F j, Y \a\t g:i A');
    } catch (Exception $e) {
        return $dateString;
    }
}

function sanitizeFilename($filename)
{
    $filename = preg_replace('/[^a-zA-Z0-9\-_\.]/', '_', $filename);
    $filename = preg_replace('/_{2,}/', '_', $filename);
    return trim($filename, '_');
}
