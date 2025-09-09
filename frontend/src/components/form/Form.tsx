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
            {error && <p style={{color: 'red'}} className="mt-0">{error}</p>}
            <button type="submit" className={buttonClassName}>
                {submitLabel}
            </button>


        </form>

    )

}