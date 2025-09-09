<?php
require_once '../config/Database.php';

use config\Database;

class RPODataPopulator {
    private $conn;
    private $baseUrl = 'https://api.statistics.sk/rpo/v1/search';
    private $rateLimit = 1;

    // Cities to fetch
    private $cities = [
        'Košice',
        'Prešov',
        'Bardejov'
    ];

    public function __construct($db) {
        $this->conn = $db;
    }

    private function makeRequest($url) {
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => [
                    'User-Agent: RPO-Data-Fetcher/1.0',
                    'Accept: application/json'
                ],
                'timeout' => 30
            ]
        ]);

        $response = @file_get_contents($url, false, $context);

        if ($response === false) {
            if (isset($http_response_header)) {
                foreach ($http_response_header as $header) {
                    if (str_contains($header, '429')) {
                        echo "Rate limited, waiting 60 seconds...\n";
                        sleep(60);
                        return $this->makeRequest($url);
                    }
                }
            }
        }

        return $response;
    }

    private function fetchCitiesData($city) {
        $params = [
            'addressMunicipality' => $city,
            'establishmentAfter' => '2016-01-01',
            'establishmentBefore' => '2016-12-31',
        ];

        $totalProcessed = 0;


        $url = $this->baseUrl . '?' . http_build_query($params);

        echo "Fetching: {$url}\n";

        $response = $this->makeRequest($url);

        if ($response === false) {
            echo "Failed to fetch data for {$city}, offset {$params['offset']}\n";
            return;
        }

        $data = json_decode($response, true);

        if (!$data || !isset($data['results'])) {
            echo "No data or invalid response for {$city}\n";
            return;
        }

        $items = $data['results'];
        $processedCount = $this->processItems($items);
        $totalProcessed += $processedCount;

        echo "Processed {$processedCount} companies from {$city} (total: {$totalProcessed})\n";

        sleep($this->rateLimit);


        echo "Finished {$city}: {$totalProcessed} companies processed\n\n";
    }

    private function processItems($items): int
    {
        $processed = 0;

        foreach ($items as $item) {
            if ($this->insertCompany($item)) {
                $processed++;
            }
        }

        return $processed;
    }

    private function insertCompany($companyData): bool
    {
        try {
            $name = $this->extractCompanyName($companyData);
            if (!$name) {
                echo "Skipping company - no name found\n";
                return false;
            }

            $ico = $this->extractICO($companyData);
            if (!$ico) {
                echo "Skipping company - no ICO found\n";
                return false;
            }

            $address = $this->extractCurrentAddress($companyData);

            $establishment = $this->exctractEstablishment($companyData);
            $stmt = $this->conn->prepare("SELECT id FROM company WHERE ico = ?");
            $stmt->execute([$ico]);
            if ($stmt->fetch()) {
                echo "Company with ICO {$ico} already exists, skipping\n";
                return false;
            }

            $stmt = $this->conn->prepare("
                INSERT INTO company (name, ico, street, building_number, postal_code, city, country)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");

            $stmt->execute([
                $name,
                $ico,
                $address['street'] ?? null,
                $address['building_number'] ?? null,
                $address['postal_code'] ?? null,
                $address['city'] ?? null,
                $address['country'] ?? 'Slovenská republika'
            ]);

            echo "Inserted company: {$name} (ICO: {$ico})";
            return true;

        } catch (Exception $e) {
            echo "Error inserting company: " . $e->getMessage() . "\n";
            return false;
        }
    }


    private function exctractEstablishment($data)
    {
        if (isset($data['establishment'])) {
            return $data['establishment'];
        }

        return null;

    }
    private function extractCompanyName($data): string | null {
        if (isset($data['fullNames']) && is_array($data['fullNames'])) {
            $currentName = null;
            $latestDate = '';

            foreach ($data['fullNames'] as $nameEntry) {
                if (!isset($nameEntry['validTo'])) {
                    return $nameEntry['value'];
                } elseif ($nameEntry['validFrom'] > $latestDate) {
                    $latestDate = $nameEntry['validFrom'];
                    $currentName = $nameEntry['value'];
                }
            }

            return $currentName;
        }

        return null;
    }

    private function extractICO($data) {
        if (isset($data['identifiers']) && is_array($data['identifiers'])) {
            foreach ($data['identifiers'] as $identifier) {
                if (isset($identifier['value'])) {
                    return $identifier['value'];
                }
            }
        }

        return null;
    }

    private function extractCurrentAddress($data): array
    {
        if (!isset($data['addresses']) || !is_array($data['addresses'])) {
            return [];
        }

        foreach ($data['addresses'] as $address) {
            if (!isset($address['validTo'])) {
                return [
                    'street' => $address['street'] ?? null,
                    'building_number' => $address['buildingNumber'] ?? null,
                    'postal_code' => $address['postalCodes'][0] ?? null,
                    'city' => $address['municipality']['value'] ?? null,
                    'country' => $address['country']['value'] ?? null
                ];
            }
        }

        $latestAddress = null;
        $latestDate = '';

        foreach ($data['addresses'] as $address) {
            if ($address['validFrom'] > $latestDate) {
                $latestDate = $address['validFrom'];
                $latestAddress = $address;
            }
        }

        if ($latestAddress) {
            return [
                'street' => $latestAddress['street'] ?? null,
                'building_number' => $latestAddress['buildingNumber'] ?? null,
                'postal_code' => $latestAddress['postalCodes'][0] ?? null,
                'city' => $latestAddress['municipality']['value'] ?? null,
                'country' => $latestAddress['country']['value'] ?? null
            ];
        }

        return [];
    }

    public function populateData(): void
    {
        echo "Starting data population...\n";

        foreach ($this->cities as $city) {
            echo "Fetching companies from {$city}...\n";
            $this->fetchCitiesData($city);

            sleep($this->rateLimit);
        }

        echo "Data population completed!\n";
    }
}

try {

    echo "hereas";
    $database = new Database();
    $db = $database->getConnection();

    $populator = new RPODataPopulator($db);
    $populator->populateData();

} catch (Exception $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
