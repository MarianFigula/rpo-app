<?php

namespace Company\Process;

use config\Database;
use Exception;
use PDO;
use PDOException;

class GetCompaniesByIcoOrName
{

    private ?PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }


    /**
     * @param string $searchQuery
     * @param int $limit
     * @return array|false
     * @throws Exception
     */
    public function get(string $searchQuery = '', int $limit = 10)
    {
        $query = "SELECT
            c.name,
            c.ico,
            c.formatedAddress,
            c.street,
            c.building_number,
            c.postal_code,
            c.city,
            c.country,
            MATCH(c.name, c.ico) AGAINST (:query IN BOOLEAN MODE) as score
            FROM company c 
            WHERE MATCH(c.name, c.ico) AGAINST (:query IN BOOLEAN MODE)
            ORDER BY score DESC 
            LIMIT :limit";

        try {
            $modifiedSearchQuery = '*' . $searchQuery . '*';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':query', $modifiedSearchQuery);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Database query failed: " . $e->getMessage());
        }

    }

}