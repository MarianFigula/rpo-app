<?php

namespace Advertisement\TemplateBuilder;

include_once '../../utils/InputSanitizer.php';

use DateTime;
use Exception;
use utils\InputSanitizer;

class PDFTemplateBuilder
{

    function buildAddress($company): string
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

    function buildAdvertisementHTML($advertisement): string
    {
        $company = $advertisement['company'];
        $createdAt = $this->formatDate($advertisement['created_at']);

        $logoHtml = '';
        if (!empty($company['logo_url'])) {
            $logoUrl = $company['logo_url'];
            $logoPath = $_SERVER['DOCUMENT_ROOT'] . '/public' . $logoUrl;

            $logoHtml = '<img src="' . $logoPath . '" alt="Company Logo" style="max-width: 150px; max-height: 100px; margin-bottom: 20px;">';

        }

        $address = $this->buildAddress($company);

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
            <div class="company-name">' . InputSanitizer::sanitizeString($company['name']) . '</div>
            <div style="color: #666; font-size: 14pt;">Advertisement</div>
        </div>

        <div class="company-info">
            <h3>Company Information</h3>
            <div class="info-row">
                <span class="info-label">Company:</span>
                <span>' . InputSanitizer::sanitizeString($company['name']) . '</span>
            </div>';

        if (!empty($company['ico'])) {
            $html .= '
            <div class="info-row">
                <span class="info-label">ICO:</span>
                <span>' . InputSanitizer::sanitizeString($company['ico']) . '</span>
            </div>';
        }

        if (!empty($address)) {
            $html .= '
            <div class="info-row">
                <span class="info-label">Address:</span>
                <span>' . InputSanitizer::sanitizeString($address) . '</span>
            </div>';
        }

        if (!empty($company['country'])) {
            $html .= '
            <div class="info-row">
                <span class="info-label">Country:</span>
                <span>' . InputSanitizer::sanitizeString($company['country']) . '</span>
            </div>';
        }

        $html .= '
        </div>

        <div class="advertisement-content">
            <h3>Advertisement Content</h3>
            <div class="advertisement-text">
                ' . nl2br(InputSanitizer::sanitizeString($advertisement['text'])) . '
            </div>
        </div>

        <div class="footer">
            <p>Advertisement creation date: ' . $createdAt . '</p>
        </div>
    </body>
    </html>';

        return $html;
    }
}