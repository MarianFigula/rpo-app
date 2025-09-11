import {PlusIcon} from "lucide-react";
import type {AdvertisementCardModel, CompanyCardModel} from "../types/model/types.ts";
import {Modal} from "./Modal.tsx";
import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import {AdvertisementForm} from "./form/AdvertisementForm.tsx";
import AdvertisementCard from "./AdvertisementCard.tsx";
import {ApiGeneralResponse} from "../types/api/types.ts";


const AdvertisementSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<CompanyCardModel | null>(null);
    const [advertisements, setAdvertisements] = useState<AdvertisementCardModel[] | null>(null);
    const [editingAdvertisement, setEditingAdvertisement] = useState<AdvertisementCardModel | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchAdvertisements = async () => {
        const serverUrl = 'http://localhost:8000'
        try {

            const response = await fetch(`${serverUrl}/api/advertisement/get-advertisements.php`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success){
                throw new Error(`Success is false ${response.status}`);
            }
            setAdvertisements(data.data.advertisements)
            console.log('Advertisements data:', data);

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchAdvertisements()
    }, []);

    const handleEdit = (advertisement: AdvertisementCardModel) => {
        console.log("editing advertisement")
        console.log(advertisement)

        setEditingAdvertisement(advertisement);
        setSelectedCompany(advertisement.company);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleRemove = async (advertisemet: AdvertisementCardModel) => {
        console.log(advertisemet)

        try {
            // TODO: for now
            const serverUrl: string = "http://localhost:8000";

            if (!serverUrl) {
                throw new Error('REACT_APP_SERVER_URL is not defined');
            }

            const requestData = {
                id: advertisemet.id
            };

            const response = await fetch(`${serverUrl}/api/advertisement/remove-advertisement.php`, {
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
            console.log(data)
            // todo nejak inak skusit spravit
            location.reload()


        } catch (error) {
            console.error('Error fetching companies:', error);
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

    const handleDownload = () => {
        console.log("downloading")
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

    const addAdvertisement = async (formData: AdvertisementCardModel) => {
        try {
            // TODO: for now
            const serverUrl: string = "http://localhost:8000";

            if (!serverUrl) {
                throw new Error('REACT_APP_SERVER_URL is not defined');
            }

            const requestData = {
                company_id: formData.company.id,
                text: formData.text
            };

            const response = await fetch(`${serverUrl}/api/advertisement/add-advertisement.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiGeneralResponse = await response.json();
            console.log('data', data);
            // todo nejak inak spravit reload
            // location.reload()

        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    }

    const updateAdvertisement = async (formData: AdvertisementCardModel) => {
        try {
            const serverUrl: string = "http://localhost:8000";

            if (!serverUrl) {
                throw new Error('REACT_APP_SERVER_URL is not defined');
            }

            const requestData = {
                id: formData.id,
                text: formData.text
            };

            const response = await fetch(`${serverUrl}/api/advertisement/update-advertisement.php`, {
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
            console.log('Updated advertisement:', data);
            // todo nejak inak spravit reload
            location.reload()

        } catch (error) {
            console.error('Error updating advertisement:', error);
        }
    }

    const handleSubmit = async (formData: AdvertisementCardModel) => {
        if (isEditing) {
            await updateAdvertisement(formData);
        } else {
            await addAdvertisement(formData);
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
                        onDownload={handleDownload}/>
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
        </>

    )
}

export default AdvertisementSection