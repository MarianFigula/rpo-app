import {PlusIcon} from "lucide-react";
import type {AdvertisementCardModel} from "../types/model/types.ts";
import {Modal} from "./Modal.tsx";
import {useState} from "react";
import SearchBar from "./SearchBar.tsx";
import {AdvertisementForm} from "./form/AdvertisementForm.tsx";
import AdvertisementCard from "./AdvertisementCard.tsx";


const sampleAdvertisementsCard: AdvertisementCardModel[] = [
    {
        company: {
            name: "TechSolutions Slovakia s.r.o.",
            ico: "12345678",
            street: "Hlavná ulica",
            building_number: '123',
            postal_code: "08001",
            city: "Bratislava",
            country: "Slovensko",
            logo_url: null,
        },
        text: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
    },    {
        company: {
            name: "TechSolutions Slovakia s.r.o.",
            ico: "12345678",
            street: "Hlavná ulica",
            building_number: '123',
            postal_code: "08001",
            city: "Bratislava",
            country: "Slovensko",
            logo_url: null,
        },
        text: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
    },    {
        company: {
            name: "TechSolutions Slovakia s.r.o.",
            ico: "12345678",
            street: "Hlavná ulica",
            building_number: '123',
            postal_code: "08001",
            city: "Bratislava",
            country: "Slovensko",
            logo_url: null,
        },
        text: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
    },    {
        company: {
            name: "TechSolutions Slovakia s.r.o.",
            ico: "12345678",
            street: "Hlavná ulica",
            building_number: '123',
            postal_code: "08001",
            city: "Bratislava",
            country: "Slovensko",
            logo_url: null,
        },
        text: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
    },    {
        company: {
            name: "TechSolutions Slovakia s.r.o.",
            ico: "12345678",
            street: "Hlavná ulica",
            building_number: '123',
            postal_code: "08001",
            city: "Bratislava",
            country: "Slovensko",
            logo_url: null,
        },
        text: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
    },    {
        company: {
            name: "TechSolutions Slovakia s.r.o.",
            ico: "12345678",
            street: "Hlavná ulica",
            building_number: '123',
            postal_code: "08001",
            city: "Bratislava",
            country: "Slovensko",
            logo_url: null,
        },
        text: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
    },
];


const AdvertSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [advertisementData, setAdvertisementData] = useState<Advertisement>(null) // pridat company

    const handleEdit = () => {
        console.log("editing")
    };

    const handleRemove = () => {
        console.log("removing")
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDownload = () => {
        console.log("downloading")
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
                {sampleAdvertisementsCard.map((ad, index) => (
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
                        onCompanySelect={(company) => console.log(company)}
                    />
                    <AdvertisementForm
                     onSubmit={() => console.log("submiting")}
                    />
                </div>
            </Modal>
        </>

    )
}

export default AdvertSection