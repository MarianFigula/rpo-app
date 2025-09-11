<?php

namespace Company\Repository;

use config\Database;
use Exception;
use PDO;
use PDOException;

class CompanyRepository
{

    private ?PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }


    /**
     * @param $data
     * @return false|string
     * @throws Exception
     */
    public function addCompany($data): false|string
    {
        if (empty($data)){
            return false;
        }

        $query = "INSERT INTO company (name, ico, street, building_number, postal_code, city, country, logo_url) 
            VALUES(?,?,?,?,?,?,?,?)";

        try {
            $stmt = $this->conn->prepare($query);
            $isInserted = $stmt->execute([
                $data['company_name'],
                $data['company_ico'],
                $data['company_street'],
                $data['company_building_number'],
                $data['company_postal_code'],
                $data['company_city'],
                $data['company_country'],
                $data['company_logo_url']
            ]);

            if (!$isInserted) {
                return false;
            }

            return $this->conn->lastInsertId();

        }catch (PDOException $e){
            throw new Exception("Database query failed: " . $e->getMessage());
        }

    }

    /**
     * @param string $searchQuery
     * @param int $limit
     * @return array
     * @throws Exception
     */
    public function getByNameOrIco(string $searchQuery = '', int $limit = 10): array
    {

        if (empty(trim($searchQuery))) {
            return [];
        }

        $query = "SELECT
            c.id,
            c.name,
            c.ico,
            c.street,
            c.building_number,
            c.postal_code,
            c.city,
            c.country,
            c.logo_url,
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


    /**
     * @param string $ico
     * @return string
     * @throws Exception
     */
    public function getIdByIco(string $ico = ''): string
    {
        if (empty($ico)) return '';

        $query = "SELECT c.id from company c WHERE c.ico = :ico";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':ico', $ico);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }catch (PDOException $e) {
            throw new Exception("Database query failed: " . $e->getMessage());
        }
    }

    /**
     * @param $data
     * @return bool
     * @throws Exception
     */
    public function updateCompanyById($data) : bool
    {
        if (empty($data) || !isset($data['company_id'])){
            return false;
        }

        $query = "UPDATE company SET 
                name = ?,
                ico = ?,
                street = ?,
                building_number = ?,
                postal_code = ?,
                city = ?,
                country = ?,
                logo_url = ? WHERE id = ?";

        try {
            $stmt = $this->conn->prepare($query);

            return $stmt->execute([
                $data['company_name'],
                $data['company_ico'],
                $data['company_street'],
                $data['company_building_number'],
                $data['company_postal_code'],
                $data['company_city'],
                $data['company_country'],
                $data['company_logo_url'],
                $data['company_id']
            ]);

        }catch (PDOException $e) {
            throw new Exception("Database query failed: " . $e->getMessage());
        }
    }
}