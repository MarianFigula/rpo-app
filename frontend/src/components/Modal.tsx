import { X } from "lucide-react";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isEditing?: boolean;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, isEditing = false, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl max-w-[60vw] mx-4 max-h-[90vh] h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">{isEditing ? `Edit ${title}` : `Add ${title}`}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}