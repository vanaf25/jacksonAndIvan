import React from 'react';

export default function FormInput({ label, id, value, type = "text", onChange, autocomplete, pattern, maxlength, size }) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value || ""}
                onChange={onChange}
                autoComplete={autocomplete || ""}
                pattern={pattern}
                maxLength={maxlength}
                size={size}
            />
        </div>
    );
}
