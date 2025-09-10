import React, {useState, useEffect} from "react";
import {Form} from "./Form";
import {FormInput} from "./FormInput";
import type {AdvertisementFormProps} from "../../types/props/types.ts";
import type {AdvertisementCardModel} from "../../types/model/types.ts";

const emptyAdvertisement: AdvertisementCardModel = {
    id: "",
    company: {
        id: "",
        name: "",
        ico: "",
        street: "",
        building_number: "",
        postal_code: "",
        city: "",
        logo_url: "",
        country: "",
    },
    text: "",
    created_at: "",
};

export function AdvertisementForm(
    {
        initialData,
        onSubmit,
        isEditing = false
    }: AdvertisementFormProps) {
    const [formData, setFormData] = useState<AdvertisementCardModel>(initialData || emptyAdvertisement);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setFormData(initialData ? initialData : emptyAdvertisement)

    }, [initialData]);

    const handleInputChange = (field: keyof AdvertisementCardModel | string) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;

        if (field === 'text') {
            setFormData(prev => ({
                ...prev,
                text: value
            }));
        } else {
            const companyField = field as keyof typeof formData.company;
            setFormData(prev => ({
                ...prev,
                company: {
                    ...prev.company,
                    [companyField]: value
                }
            }));
        }
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!formData.company.name.trim()) {
            setError("Name is required");
            return;
        }
        if (!formData.company.ico.trim()) {
            setError("IČO is required");
            return;
        }
        if (!formData.company.street.trim()) {
            setError("Street is required");
            return;
        }
        if (!formData.company.building_number.trim()) {
            setError("Building number is required");
            return;
        }
        if (!formData.company.postal_code.trim()) {
            setError("Postal code is required");
            return;
        }
        if (!formData.company.city.trim()) {
            setError("City is required");
            return;
        }
        if (!formData.company.country.trim()) {
            setError("Country is required");
            return;
        }
        if (!formData.text.trim()) {
            setError("Text is required");
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
                    label="Company name"
                    value={formData.company.name}
                    onChange={handleInputChange('name')}
                    required
                    placeholder="Company name"
                />

                <FormInput
                    label="ICO"
                    value={formData.company.ico}
                    onChange={handleInputChange('ico')}
                    required
                    placeholder="12345678"
                />

                <FormInput
                    label="Street Name"
                    value={formData.company.street}
                    onChange={handleInputChange('street')}
                    required
                    placeholder="Street name"
                />

                <FormInput
                    label="Building Number"
                    value={formData.company.building_number}
                    onChange={handleInputChange('building_number')}
                    required
                    placeholder="123"
                />

                <FormInput
                    label="Postal Code"
                    value={formData.company.postal_code}
                    onChange={handleInputChange('postal_code')}
                    required
                    placeholder="12345"
                />

                <FormInput
                    label="City"
                    value={formData.company.city}
                    onChange={handleInputChange('city')}
                    required
                    placeholder="Bratislava"
                />

                <FormInput
                    label="Country"
                    value={formData.company.country}
                    onChange={handleInputChange('country')}
                    placeholder="Slovakia"
                    required
                />

                <FormInput
                    label="Text"
                    type="textarea"
                    value={formData.text}
                    onChange={handleInputChange('text')}
                    required
                    placeholder="Start typing..."
                    rows={8}
                />

                <FormInput
                    label="Logo"
                    type="file"
                    value={formData.company.logo_url as string}
                    onChange={handleInputChange('logo_url')}
                    required={false}
                />
            </div>
        </Form>
    );
}