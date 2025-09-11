import type {ApiGetCompaniesResponse} from "../../types/api/types.ts";

const SERVER_API_URL = import.meta.env.VITE_API_URL + '/api' || "http://localhost:8000/api"

export const getCompanies = async (query: string) => {
    try {

        const response = await fetch(`${SERVER_API_URL}/company/get-companies.php?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data: ApiGetCompaniesResponse = await response.json();

        if (!data.success){
            throw new Error(`${data.message}`);
        }

        return data

    } catch (error) {
        throw new Error(`Error ${error}`);
    }
}
