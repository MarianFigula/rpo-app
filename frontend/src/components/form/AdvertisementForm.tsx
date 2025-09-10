import React, {useState, useEffect} from "react";
import {Form} from "./Form";
import {FormInput} from "./FormInput";

export interface AdvertisementData {
    companyTitle: string;
    ico: string;
    address: string;
    city: string;
    country: string;
    advertisementText: string;
}

interface AdvertisementFormProps {
    initialData?: AdvertisementData;
    onSubmit: (data: AdvertisementData) => void;
    isEditing?: boolean;
}

const emptyAdvertisement: AdvertisementData = {
    companyTitle: "",
    ico: "",
    address: "",
    city: "",
    country: "",
    advertisementText: "",
};

export function AdvertisementForm(
    {
        initialData,
        onSubmit,
        isEditing = false
    }: AdvertisementFormProps) {
    const [formData, setFormData] = useState<AdvertisementData>(initialData || emptyAdvertisement);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setFormData(initialData ? initialData : emptyAdvertisement)

    }, [initialData]);

    const handleInputChange = (field: keyof AdvertisementData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        // Basic validation
        if (!formData.companyTitle.trim()) {
            setError("Názov spoločnosti je povinný");
            return;
        }
        if (!formData.ico.trim()) {
            setError("IČO je povinné");
            return;
        }
        if (!formData.address.trim()) {
            setError("Adresa je povinná");
            return;
        }
        if (!formData.city.trim()) {
            setError("Mesto je povinné");
            return;
        }
        if (!formData.advertisementText.trim()) {
            setError("Text inzerátu je povinný");
            return;
        }

        onSubmit(formData);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            error={error}
            submitLabel={isEditing ? "Save advertisement" : "Create advertisement"}
            buttonClassName="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors"
        >
            <div className="space-y-4">
                <FormInput
                    label="Firma"
                    value={formData.companyTitle}
                    onChange={handleInputChange('companyTitle')}
                    required
                    placeholder="Zadajte názov firmy"
                />

                <FormInput
                    label="IČO"
                    value={formData.ico}
                    onChange={handleInputChange('ico')}
                    required
                    placeholder="12345678"
                />

                <FormInput
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    required
                    placeholder="Main Street 123"
                />

                <FormInput
                    label="City"
                    value={formData.city}
                    onChange={handleInputChange('city')}
                    required
                    placeholder="Bratislava"
                />

                <FormInput
                    label="Country"
                    value={formData.country}
                    onChange={handleInputChange('country')}
                    placeholder='Slovakia'
                    required
                />

                <FormInput
                    label="Advertisement text"
                    type="textarea"
                    value={formData.advertisementText}
                    onChange={handleInputChange('advertisementText')}
                    required
                    placeholder=""
                    rows={8}
                />
            </div>
        </Form>
    );
}