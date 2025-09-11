

export const getImageUrl = (logoUrl: string | null | undefined): string => {

    if (!logoUrl) {
        return '/src/assets/company-logo-placeholder.png';
    }

    const API_BASE_URL = import.meta.env.VITE_API_URL + '/public' || 'http://localhost:8000/public';

    return `${API_BASE_URL}${logoUrl}`;
};