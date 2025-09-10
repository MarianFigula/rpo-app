export interface Company {
    name: string;
    ico: string;
    formatedAddress?: string | null;
    street?: string;
    building_number?: string;
    postal_code?: string;
    city?: string;
    country?: string;
    score?: string;
}


export interface Advertisement {
    companyLogo?: string;
    companyTitle: string;
    ico: string;
    address: string;
    city: string;
    country: string;
    advertisementText: string;
}