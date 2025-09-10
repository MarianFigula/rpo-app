import type {AdvertisementCardModel, CompanyCardModel} from "../model/types.ts";
import React from "react";


export interface SearchBarProps {
    searchId: string;
    placeholder?: string;
    onCompanySelect?: (company: CompanyCardModel) => void;
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
    initialData?: AdvertisementCardModel;
    onSubmit: (data: AdvertisementCardModel) => void;
    isEditing?: boolean;
}
