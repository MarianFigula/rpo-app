export interface Company {
    id: string;
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
    id: string,
    company_id: string,
    text: string;
    created_at: string,
    updated_at: string
}


export interface AdvertisementCardModel {
    id: string,
    company: CompanyCardModel,
    text: string,
    created_at: string,
}