import type {AdvertisementCardModel} from "../../types/model/types.ts";
import type {ApiGeneralResponse} from "../../types/api/types.ts";
import {createPdfFromBlob} from "../../utils/utils.ts";

const SERVER_API_URL = import.meta.env.VITE_API_URL + '/api' || "http://localhost:8000/api"


export const createAdvertisement = async (advertisementCardModel: AdvertisementCardModel, logoFile?: File) => {
    try {
        const requestFormData = new FormData();

        requestFormData.append('company_id', advertisementCardModel.company.id);
        requestFormData.append('text', advertisementCardModel.text);

        requestFormData.append('company_name', advertisementCardModel.company.name);
        requestFormData.append('company_ico', advertisementCardModel.company.ico);
        requestFormData.append('company_street', advertisementCardModel.company.street);
        requestFormData.append('company_building_number', advertisementCardModel.company.building_number);
        requestFormData.append('company_postal_code', advertisementCardModel.company.postal_code);
        requestFormData.append('company_city', advertisementCardModel.company.city);
        requestFormData.append('company_country', advertisementCardModel.company.country);

        if (logoFile) {
            requestFormData.append('logo', logoFile);
        }

        const response = await fetch(`${SERVER_API_URL}/advertisement/add-advertisement.php`, {
            method: 'POST',
            body: requestFormData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiGeneralResponse = await response.json();

        return data

    } catch (error) {
        throw new Error(`Error ${error}`);
    }
}

export const getAdvertisements = async () => {
    try {

        const response = await fetch(`${SERVER_API_URL}/advertisement/get-advertisements.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Something failed`);
        }

        return await response.json()

    } catch (error) {
        throw new Error(`Error ${error}`);
    }
}

export const updateAdvertisement = async (formData: AdvertisementCardModel) => {
    try {

        const requestData = {
            id: formData.id,
            text: formData.text
        };

        const response = await fetch(`${SERVER_API_URL}/advertisement/update-advertisement.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiGeneralResponse = await response.json();

        return data

    } catch (error) {
        throw new Error(`Error ${error}`);
    }

}


export const removeAdvertisement = async (advertisement: AdvertisementCardModel) => {
    try {
        const requestData = {
            id: advertisement.id
        };

        const response = await fetch(`${SERVER_API_URL}/advertisement/remove-advertisement.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiGeneralResponse = await response.json();

        return data

    } catch (error) {
        throw new Error(`Error ${error}`);
    }
}

export const downloadAdvertisement = async (advertisement: AdvertisementCardModel) => {
    try {
        const response = await fetch(`${SERVER_API_URL}/advertisement/download-advertisement.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(advertisement)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/pdf')) {
            const blob: Blob = await response.blob();
            const pdfName = `advertisement_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`
            createPdfFromBlob(blob, pdfName)
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Unknown error occurred');
        }

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}