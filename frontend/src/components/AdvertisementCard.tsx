import {Building2, Edit, MapPin, Trash2} from "lucide-react";
import companyLogoPlaceholder from "../assets/company-logo-placeholder.png";


export interface AdvertisementData {
    companyLogo?: string;
    companyTitle: string;
    ico: string;
    address: string;
    city: string;
    country: string;
    advertisementText: string;
}

interface AdvertisementCardProps {
    advertisement: AdvertisementData;
    onEdit: () => void;
    onRemove: () => void;
    onDownload: () => void;
}

const AdvertisementCard = ({ advertisement, onEdit, onRemove, onDownload }: AdvertisementCardProps) => {

    const fullAddress = `${advertisement.address}, ${advertisement.city}, ${advertisement.country}`;

    return (
        <div
            className="group animate-fade-up bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
                <div className="relative flex-shrink-0">
                    <img
                        src={advertisement.companyLogo || (companyLogoPlaceholder as string)}
                        alt={`${advertisement.companyTitle}-logo`}
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {advertisement.companyTitle}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Building2 className="w-4 h-4 flex-shrink-0"/>
                        <span className="font-mono">IČO: {advertisement.ico}</span>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5"/>
                        <span className="line-clamp-2 text-left">{fullAddress}</span>
                    </div>
                </div>
            </div>

            <div className="mb-4 text-left align-bottom">
                <p className="text-sm text-gray-700 leading-relaxed">
                    {advertisement.advertisementText}
                </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 mb-8">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-400 text-amber-600 hover:bg-yellow-50 transition cursor-pointer"
                >
                    <Edit className="w-4 h-4"/> Edit
                </button>
                <button
                    onClick={onRemove}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-400 text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                    <Trash2 className="w-4 h-4"/> Delete
                </button>
            </div>
            <button onClick={onDownload}
                    className="w-full px-3 py-1.5 rounded-lg border border-indigo-400 text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
            >
                Download PDF
            </button>
        </div>
    );
};

export default AdvertisementCard