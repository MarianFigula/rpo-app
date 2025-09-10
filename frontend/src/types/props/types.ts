import type {Advertisement, Company} from "../model/types.ts";


export interface SearchBarProps {
    searchId: string;
    placeholder?: string;
    onCompanySelect?: (company: Company) => void;
}

export interface AdvertisementCardProps {
    advertisement: Advertisement;
    onEdit: () => void;
    onRemove: () => void;
    onDownload: () => void;
}
