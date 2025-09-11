import type {Company} from "../model/types.ts";


export interface ApiGetCompaniesResponse {
    success: boolean;
    message: string;
    data: {
        query: string;
        limit: number;
        count: number;
        companies: Company[];
    };
}


export interface ApiGeneralResponse {
    success: boolean;
    message: string;
}