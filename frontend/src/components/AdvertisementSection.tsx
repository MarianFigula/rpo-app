import {PlusIcon} from "lucide-react";
import type {AdvertisementCardModel, CompanyCardModel} from "../types/model/types.ts";
import {Modal} from "./Modal.tsx";
import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import {AdvertisementForm} from "./form/AdvertisementForm.tsx";
import AdvertisementCard from "./AdvertisementCard.tsx";
import {
    createAdvertisement, downloadAdvertisement,
    getAdvertisements,
    removeAdvertisement,
    updateAdvertisement
} from "../services/api/advertisementService.ts";
import { Toast } from "./toast/Toast.tsx";
import {useToast} from "./toast/useToast.ts";


const AdvertisementSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<CompanyCardModel | null>(null);
    const [advertisements, setAdvertisements] = useState<AdvertisementCardModel[] | null>(null);
    const [editingAdvertisement, setEditingAdvertisement] = useState<AdvertisementCardModel | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { toast, showSuccess, showError, hideToast } = useToast();

    const fetchAdvertisements = async () => {
        try {
            const response = await getAdvertisements();
            const advertisements = response.data.advertisements

            setAdvertisements(advertisements);
        } catch {
            showError("Could not load advertisements")
        }
    }

    useEffect(() => {
        fetchAdvertisements()
    }, []);

    const handleEdit = (advertisement: AdvertisementCardModel) => {
        setEditingAdvertisement(advertisement);
        setSelectedCompany(advertisement.company);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleRemove = async (advertisement: AdvertisementCardModel) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove the advertisement?"
        );

        if (!confirmed) return;

        try {
            const response = await removeAdvertisement(advertisement)
            console.log(response)
            if (response.success) {
                showSuccess(response.message || 'Advertisement removed successfully');
            } else {
                showError(response.message || 'Failed to remove advertisement');
            }

            await fetchAdvertisements()
        } catch {
            showError('Failed to remove advertisement');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedCompany(null);
        setEditingAdvertisement(null);
        setIsEditing(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCompany(null);
        setEditingAdvertisement(null);
        setIsEditing(false);
    };

    const handleDownload = async (advertisement: AdvertisementCardModel) => {
        await downloadAdvertisement(advertisement)
    }
    const getInitialFormData = (): AdvertisementCardModel | undefined => {
        if (isEditing && editingAdvertisement) {
            return editingAdvertisement;
        }

        if (!isEditing && selectedCompany) {
            return {
                id: "",
                company: selectedCompany,
                text: "",
                created_at: ""
            };
        }

        return undefined;
    };

    const addAdvertisement = async (advertisementCardModel: AdvertisementCardModel, logoFile?: File) => {
        try {
            const response = await createAdvertisement(advertisementCardModel, logoFile);

            if (response.success) {
                showSuccess(response.message || 'Advertisement was add successfully');
            } else {
                showError(response.message || 'Failed to add advertisement');
            }

            await fetchAdvertisements();
        } catch {
            showError('Failed to add advertisement');
        }
    };

    const editAdvertisement = async (formData: AdvertisementCardModel) => {
        try {
            const response = await updateAdvertisement(formData)

            if (response.success) {
                showSuccess(response.message || 'Advertisement was edited successfully');
            } else {
                showError(response.message || 'Failed to edit advertisement');
            }

            await fetchAdvertisements();
        } catch {
            showError('Failed to edit advertisement');
        }
    }

    const handleSubmit = async (formData: AdvertisementCardModel, logoFile?: File) => {
        if (isEditing) {
            await editAdvertisement(formData);
        } else {
            await addAdvertisement(formData, logoFile);
        }
        closeModal();
    }

    return (
        <>
            <div className="mb-8 text-center flex-col justify-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Advertisement
                </h1>
                <p className="text-muted-foreground mb-4">
                    Overview of all advertisements
                </p>
                <button
                    className="flex items-center gap-2 mx-auto bg-emerald-500 text-white px-4 py-1.5 rounded shadow hover:bg-emerald-600 cursor-pointer"
                    onClick={openModal}
                >
                    <PlusIcon className="w-5 h-5"/> Add advertisement
                </button>
            </div>
            <div className="px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {advertisements?.map((ad, index) => (
                    <AdvertisementCard
                        key={index}
                        advertisement={ad}
                        onEdit={() => handleEdit(ad)}
                        onRemove={() => handleRemove(ad)}
                        onDownload={() => handleDownload(ad)}/>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Advertisement"
                isEditing={isEditing}
            >
                <div className="space-y-4">
                    {!isEditing && (
                        <SearchBar
                            searchId='search-company'
                            placeholder={"Search Company"}
                            onCompanySelect={(company) => setSelectedCompany(company)}
                        />
                    )}
                    <AdvertisementForm
                        onSubmit={handleSubmit}
                        initialData={getInitialFormData()}
                        isEditing={isEditing}
                    />
                </div>
            </Modal>
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />
        </>

    )
}

export default AdvertisementSection