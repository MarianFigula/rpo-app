import type {AdvertisementCardModel, CompanySearch} from "../model/types.ts";
import React from "react";
import type {AdvertisementData} from "../../components/form/AdvertisementForm.tsx";


export interface SearchBarProps {
    searchId: string;
    placeholder?: string;
    onCompanySelect?: (company: CompanySearch) => void;
}

export interface AdvertisementCardProps {
    advertisement: AdvertisementCardModel;
    onEdit: () => void;
    onRemove: () => void;
    onDownload: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isEditing?: boolean;
    children: React.ReactNode;
}

export interface AdvertisementFormProps {
    initialData?: AdvertisementData;
    onSubmit: (data: AdvertisementData) => void;
    isEditing?: boolean;
}
