import React, {useState, useEffect} from "react";
import {Form} from "./Form";
import {FormInput} from "./FormInput";
import type {AdvertisementFormProps} from "../../types/props/types.ts";
import type {AdvertisementCardModel} from "../../types/model/types.ts";
import {isStringLongerThan} from "../../utils/utils.ts";

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
    }: AdvertisementFormProps)
{
    const [formData, setFormData] = useState<AdvertisementCardModel>(initialData || emptyAdvertisement);
    const [error, setError] = useState<string>("");
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined);

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setLogoFile(event.target?.files[0]);
        }
    };

    const validateForm = (): string | null => {
        const requiredFields = [
            { value: formData.company.name, name: "Name" },
            { value: formData.company.ico, name: "ICO" },
            { value: formData.company.street, name: "Street" },
            { value: formData.company.building_number, name: "Building number" },
            { value: formData.company.postal_code, name: "Postal code" },
            { value: formData.company.city, name: "City" },
            { value: formData.company.country, name: "Country" },
            { value: formData.text, name: "Text" }
        ];

        for (const field of requiredFields) {
            if (!field.value.trim()) {
                return `${field.name} is required`;
            }
        }

        if (isStringLongerThan(8, formData.company.ico)) {
            return "ICO must have 8 characters";
        }

        if (isStringLongerThan(5, formData.company.postal_code)) {
            return "Postal code must have 5 characters";
        }

        return null;
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        onSubmit(formData, logoFile);
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
                    disabled={isEditing}
                />

                <FormInput
                    label="ICO"
                    value={formData.company.ico}
                    onChange={handleInputChange('ico')}
                    required
                    placeholder="12345678"
                    disabled={isEditing}
                />

                <FormInput
                    label="Street Name"
                    value={formData.company.street}
                    onChange={handleInputChange('street')}
                    required
                    placeholder="Street name"
                    disabled={isEditing}
                />

                <FormInput
                    label="Building Number"
                    value={formData.company.building_number}
                    onChange={handleInputChange('building_number')}
                    required
                    placeholder="123"
                    disabled={isEditing}
                />

                <FormInput
                    label="Postal Code"
                    value={formData.company.postal_code}
                    onChange={handleInputChange('postal_code')}
                    required
                    placeholder="12345"
                    disabled={isEditing}
                />

                <FormInput
                    label="City"
                    value={formData.company.city}
                    onChange={handleInputChange('city')}
                    required
                    placeholder="Bratislava"
                    disabled={isEditing}
                />

                <FormInput
                    label="Country"
                    value={formData.company.country}
                    onChange={handleInputChange('country')}
                    placeholder="Slovakia"
                    required
                    disabled={isEditing}
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
                    onChange={handleFileChange}
                    required={false}
                    accept="image/png, image/jpeg"
                    disabled={isEditing}
                />
            </div>
        </Form>
    );
}