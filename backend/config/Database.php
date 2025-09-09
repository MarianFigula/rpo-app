<?php

namespace config;

use PDO;
use PDOException;

class Database
{
    private $hostname = 'database';
    private $dbname = 'rpo-app';
    private $username = 'root';
    private $password = 'root';
    public $conn;

    public function getConnection()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=". $this->hostname .";dbname=". $this->dbname .";charset=utf8mb4",
                $this->username, $this->password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::MYSQL_ATTR_MULTI_STATEMENTS => 1
                ]);

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, 1);

        }catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}