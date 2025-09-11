import {Building2, Edit, Loader2, MapPin, Trash2} from "lucide-react";

import type {AdvertisementCardProps} from "../types/props/types.ts";
import {getImageUrl} from "../utils/utils.ts";
import {useState} from "react";

const AdvertisementCard = ({ advertisement, onEdit, onRemove, onDownload }: AdvertisementCardProps) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const fullAddress = `${advertisement.company.street}, ${advertisement.company.city}, ${advertisement.company.country}`;

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await onDownload();
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="group animate-fade-up bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col w-full min-w-0">
            <div className="flex items-start gap-4 mb-6">
                <div className="relative flex-shrink-0">
                    <img
                        src={getImageUrl(advertisement.company.logo_url)}
                        alt={`${advertisement.company.name}-logo`}
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {advertisement.company.name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Building2 className="w-4 h-4 flex-shrink-0"/>
                        <span className="font-mono">IČO: {advertisement.company.ico}</span>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5"/>
                        <span className="line-clamp-2 text-left">{fullAddress}</span>
                    </div>
                </div>
            </div>

            <div className="mb-4 text-left align-bottom">
                <p className="text-sm text-gray-700 leading-relaxed">
                    {advertisement.text}
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
            <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full px-3 py-1.5 rounded-lg border border-indigo-400 text-indigo-600 hover:bg-indigo-50 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isDownloading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin"/>
                        Downloading...
                    </>
                ) : (
                    "Download PDF"
                )}
            </button>
        </div>
    );
};

export default AdvertisementCard