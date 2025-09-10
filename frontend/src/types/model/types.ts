export interface Company {
    name: string;
    ico: string;
    street: string;
    building_number: string;
    postal_code: string;
    city: string;
    logo_url: string | null,
    country: string;
    score: string;
    created_at: string,
    updated_at: string
}


export type CompanyCardModel = Omit<Company, 'score' | 'created_at' | 'updated_at'>

export type CompanySearch = Omit<Company, 'logo_url' | 'created_at' | 'updated_at'>

export interface Advertisement {
    company: Company, // mozno tu dat len company id
    text: string;
    created_at: string,
    updated_at: string
}

export interface AdvertisementCardModel {
    company: CompanyCardModel,
    text: string,
}