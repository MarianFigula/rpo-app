<?php

namespace model;

class Advertisement
{
    private int $company_id;
    private string $text;
    private ?string $logo_url;

    public function getCompanyId(): int
    {
        return $this->company_id;
    }
    public function setCompanyId(int $company_id): void
    {
        $this->company_id = $company_id;
    }

    public function getText(): string
    {
        return $this->text;
    }
    public function setText(string $text): void
    {
        $this->text = $text;
    }

    public function getLogoUrl(): ?string
    {
        return $this->logo_url;
    }
    public function setLogoUrl(?string $logo_url): void
    {
        $this->logo_url = $logo_url;
    }
}
