import React from "react";
import type {FormInputProps} from "../../types/props/types.ts";

export function FormInput(
    {
        label,
        type = "text",
        value,
        onChange,
        options = [],
        required = false,
        accept,
        disabled = false,
        multiple,
        ...props
    }: FormInputProps) {
    const id = `form-input-${label.toLowerCase()}`;

    const fileClasses = disabled
        ? "file:cursor-not-allowed file:bg-gray-100 file:text-gray-500"
        : "file:cursor-pointer file:rounded file:border-0 file:bg-gray-200 file:px-2 file:py-1 file:transition file:duration-300 hover:file:bg-gray-400 hover:file:text-white";

    const baseInputClasses =
        "w-[50vw] p-2.5 border border-gray-300 rounded-lg box-border " +
        "focus:outline-none focus:ring-2 focus:ring-blue-500 " +
        (disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed " : "") +
        (type === "file" ? fileClasses : "") +
        (type === "textarea" ? " resize-y" : "");

    return (
        <div className="mb-5 w-[50vw] mx-auto">
            <label htmlFor={id} className="block mb-1 font-medium text-gray-700 text-left">
                {label}
            </label>
            {type === "select" ? (
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`${baseInputClasses}`}
                    required={required}
                    disabled={disabled}
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
                    className={`${baseInputClasses}`}
                    required={required}
                    disabled={disabled}
                    {...props}
                />
            ) : type === "file" ? (
                <input
                    id={id}
                    type="file"
                    onChange={onChange}
                    className={`${baseInputClasses}`}
                    required={required}
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    {...props}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value || ""}
                    onChange={onChange}
                    className={`${baseInputClasses}`}
                    required={required}
                    disabled={disabled}
                    {...props}
                />
            )}
        </div>
    );
}
