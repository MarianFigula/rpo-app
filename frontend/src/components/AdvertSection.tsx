import {PlusIcon} from "lucide-react";
import AdvertisementCard from "./AdvertisementCard.tsx";
import {Modal} from "./Modal.tsx";
import {useState} from "react";
import SearchBar from "./SearchBar.tsx";
import {AdvertisementForm} from "./form/AdvertisementForm.tsx";
import type {Advertisement} from "../types/model/types.ts";

const sampleAdvertisements: Advertisement[] = [
    {
        companyTitle: "TechSolutions Slovakia s.r.o.",
        ico: "12345678",
        address: "Hlavná ulica 123",
        city: "Bratislava",
        country: "Slovensko",
        advertisementText: "Poskytujeme komplexné IT riešenia pre malé a stredné podniky. Špecializujeme sa na vývoj webových aplikácií, mobilných aplikácií a cloudové služby. Naši odborníci majú viac ako 10 rokov skúseností v oblasti informačných technológií.",
    },
    {
        companyTitle: "Zelená záhrada",
        ico: "87654321",
        address: "Kvetná 45",
        city: "Košice",
        country: "Slovensko",
        advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
    },
    {
        companyTitle: "Zelená záhrada",
        ico: "87654321",
        address: "Kvetná 45",
        city: "Košice",
        country: "Slovensko",
        advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
    },
    {
        companyTitle: "Zelená záhrada",
        ico: "87654321",
        address: "Kvetná 45",
        city: "Košice",
        country: "Slovensko",
        advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
    },
    {
        companyTitle: "Zelená záhrada",
        ico: "87654321",
        address: "Kvetná 45",
        city: "Košice",
        country: "Slovensko",
        advertisementText: "Profesionálne záhradnícke služby a krajinná architektúra. Návrhujeme a realizujeme záhrady, parky a verejné priestory. Ponúkame aj pravidelnú údržbu zelene a dodávku kvalitných rastlín.",
    },
];


const AdvertSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advertisementData, setAdvertisementData] = useState<Advertisement>(null) // pridat company

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
                {sampleAdvertisements.map((ad, index) => (
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
                        onCompanySelect={(company) => setAdvertisementData(company)}
                    />
                    <AdvertisementForm
                     onSubmit={() => console.log("submiting")}
                     initialData={}
                    />
                </div>
            </Modal>
        </>

    )
}

export default AdvertSection