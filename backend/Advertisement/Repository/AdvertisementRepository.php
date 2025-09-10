<?php

namespace Advertisement\Repository;

use config\Database;
use Exception;
use PDO;
use PDOException;

class AdvertisementRepository
{
    private ?PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }


    public function getAdvertisements(): array
    {
        $query = "SELECT
            c.id as company_id,
            c.name,
            c.ico,
            c.street,
            c.building_number,
            c.postal_code,
            c.city,
            c.country,
            c.logo_url,
            a.id as advertisement_id,
            a.text,
            a.created_at
            FROM company c JOIN advertisement a ON c.id = a.company_id
            ORDER BY a.created_at DESC";


        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $ads = [];
            foreach ($rows as $row) {
                $ads[] = [
                    "id" => $row["advertisement_id"],
                    "text" => $row["text"],
                    "created_at" => $row["created_at"],
                    "company" => [
                        "id" => $row["company_id"],
                        "name" => $row["name"],
                        "ico" => $row["ico"],
                        "street" => $row["street"],
                        "building_number" => $row["building_number"],
                        "postal_code" => $row["postal_code"],
                        "city" => $row["city"],
                        "country" => $row["country"],
                        "logo_url" => $row["logo_url"],
                    ]
                ];
            }

            return $ads;
        } catch (PDOException $e) {
            throw new Exception("Database query failed: " . $e->getMessage());
        }
    }

    public function addAdvertisement($data): bool
    {
        if (empty($data)){
            return false;
        }

        $id = $data['company_id'] ?? null;
        $text = $data['text'] ?? null;

        if (!$id || !$text) {
            return false;
        }

        $query = "INSERT INTO advertisement (company_id, text) VALUES(?,?)";

        try {
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([
                $id,
                $data['text'],
            ]);

        }catch (PDOException $e){
            throw new Exception("Database query failed: " . $e->getMessage());
        }

    }

    /**
     * @param $data
     * @return bool
     * @throws Exception
     */
    public function updateAdvertisementById($data) : bool
    {
        if (empty($data) || !isset($data['id'])){
            return false;
        }

        $query = "UPDATE advertisement SET text = ? WHERE id = ?";

        try {
            $stmt = $this->conn->prepare($query);

            return $stmt->execute([
                $data['text'],
                (int)$data['id']
            ]);

        }catch (PDOException $e) {
            throw new Exception("Database query failed: " . $e->getMessage());
        }
    }
}