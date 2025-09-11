

export const getImageUrl = (logoUrl: string | null | undefined): string => {

    if (!logoUrl) {
        return '/src/assets/company-logo-placeholder.png';
    }

    const API_BASE_URL = import.meta.env.VITE_API_URL + '/public' || 'http://localhost:8000/public';

    return `${API_BASE_URL}${logoUrl}`;
};

export const createPdfFromBlob = (blob: Blob, pdfName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pdfName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


export const isStringLongerThan = (maxLength: number, string: string) => {
    return string.length > maxLength;
}