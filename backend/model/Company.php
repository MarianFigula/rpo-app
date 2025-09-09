<?php

namespace model;

class Company
{
    private string $name;
    private string $ico;
    private ?string $formatedAddress;
    private ?string $street;
    private ?string $building_number;
    private ?string $postal_code;
    private ?string $city;
    private ?string $country;

    public function getName(): string
    {
        return $this->name;
    }
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getIco(): string
    {
        return $this->ico;
    }
    public function setIco(string $ico): void
    {
        $this->ico = $ico;
    }

    public function getFormatedAddress(): ?string
    {
        return $this->formatedAddress;
    }
    public function setFormatedAddress(?string $formatedAddress): void
    {
        $this->formatedAddress = $formatedAddress;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }
    public function setStreet(?string $street): void
    {
        $this->street = $street;
    }

    public function getBuildingNumber(): ?string
    {
        return $this->building_number;
    }
    public function setBuildingNumber(?string $building_number): void
    {
        $this->building_number = $building_number;
    }

    public function getPostalCode(): ?string
    {
        return $this->postal_code;
    }
    public function setPostalCode(?string $postal_code): void
    {
        $this->postal_code = $postal_code;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }
    public function setCity(?string $city): void
    {
        $this->city = $city;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }
    public function setCountry(?string $country): void
    {
        $this->country = $country;
    }
}
