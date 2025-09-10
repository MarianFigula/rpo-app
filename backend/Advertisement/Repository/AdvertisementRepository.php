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

}