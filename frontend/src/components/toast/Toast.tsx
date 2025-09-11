import React, {useEffect} from 'react';
import {CheckCircle, XCircle, X} from 'lucide-react';

export interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = (
    {
        message,
        type,
        isVisible,
        onClose,
        duration = 3000
    }) => {

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-500';
    const Icon = type === 'success' ? CheckCircle : XCircle;

    return (
        <div className="fixed top-10 right-4 z-50">
            <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md`}>
                <Icon className="w-5 h-5 flex-shrink-0"/>
                <span className="flex-1">{message}</span>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 hover:bg-green-700 hover:bg-opacity-20 rounded p-1 transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
};
