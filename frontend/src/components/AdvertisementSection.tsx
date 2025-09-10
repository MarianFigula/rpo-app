import {PlusIcon} from "lucide-react";
import type {AdvertisementCardModel, CompanyCardModel} from "../types/model/types.ts";
import {Modal} from "./Modal.tsx";
import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import {AdvertisementForm} from "./form/AdvertisementForm.tsx";
import AdvertisementCard from "./AdvertisementCard.tsx";
import {ApiPostResponse} from "../types/api/types.ts";


const AdvertisementSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<CompanyCardModel | null>(null);
    const [advertisements, setAdvertisements] = useState<AdvertisementCardModel[] | null>(null);
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
            setAdvertisements(data.data.advertisements)
            console.log('Advertisements data:', data);

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchAdvertisements()
    }, []);

    const handleEdit = () => {
        console.log("editing")
    };

    const handleRemove = () => {
        console.log("removing")
    };

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedCompany(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCompany(null);
    };

    const handleDownload = () => {
        console.log("downloading")
    }

    const getInitialFormData = (): AdvertisementCardModel | undefined => {
        if (!selectedCompany) return undefined;

        return {
            id: "",
            company: selectedCompany,
            text: "",
            created_at: ""
        };
    };

    const handleSubmit = async (formData: AdvertisementCardModel) => {
        // add data

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

            const data: ApiPostResponse = await response.json();
            console.log('data', data);


        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    }

    return (
        <>
            <div className="mb-8 text-center flex-col justify-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Obchodné inzeráty
                </h1>
                <p className="text-muted-foreground mb-4">
                    Prehľad všetkých inzerátov
                </p>
                <button
                    className="flex items-center gap-2 mx-auto bg-emerald-500 text-white px-4 py-1.5 rounded shadow hover:bg-emerald-600 cursor-pointer"
                    onClick={openModal}
                >
                    <PlusIcon className="w-5 h-5"/> Pridať inzerát
                </button>
            </div>
            <div className="px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {advertisements?.map((ad, index) => (
                    <AdvertisementCard
                        key={index}
                        advertisement={ad}
                        onEdit={handleEdit}
                        onRemove={handleRemove}
                        onDownload={handleDownload}/>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Advertisement"
            >
                <div className="space-y-4">
                    <SearchBar
                        searchId='search-company'
                        placeholder={"Search Company"}
                        onCompanySelect={(company) => setSelectedCompany(company)}
                    />
                    <AdvertisementForm
                        onSubmit={handleSubmit}
                        initialData={getInitialFormData()}
                    />
                </div>
            </Modal>
        </>

    )
}

export default AdvertisementSection