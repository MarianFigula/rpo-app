import React from "react";

interface FormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    error?: string;
    children: React.ReactNode;
    submitLabel?: string;
    buttonClassName?: string;
}

export function Form(
    {
        onSubmit,
        error,
        children,
        submitLabel = "Submit",
        buttonClassName
    }: FormProps) {

    return (
        <form onSubmit={onSubmit}>
            {children}
            {error && <p className="mt-0 mb-2 text-red-500">{error}</p>}
            <button
                type="submit"
                className={`cursor-pointer ${buttonClassName}`}
            >
                {submitLabel}
            </button>


        </form>

    )

}