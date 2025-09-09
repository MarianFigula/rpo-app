import React from "react";

interface FormInputProps {
    label: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "url" | "select" | "textarea";
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    options?: string[];
    required?: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function FormInput(
    {
        label,
        type = "text",
        value,
        onChange,
        options = [],
        required = false,
        ...props
    }: FormInputProps) {
    const id = `form-input-${label.toLowerCase()}`;

    return (
        <div>
            <label htmlFor={id} className="label mb-0-25">
                {label}
            </label>
            {type === 'select' ? (
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="input"
                    required={required}
                    {...props}
                >
                    <option value="">Select from options</option>
                    {options?.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="input"
                    required={required}
                    {...props}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="input"
                    required={required}
                    {...props}
                />
            )}
        </div>
    );
}