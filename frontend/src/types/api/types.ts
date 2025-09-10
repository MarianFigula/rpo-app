import type {Company} from "../model/types.ts";


export interface ApiGetResponse {
    success: boolean;
    message: string;
    data: {
        query: string;
        limit: number;
        count: number;
        companies: Company[];
    };
}


export interface ApiPostResponse {
    success: boolean;
    message: string;
}