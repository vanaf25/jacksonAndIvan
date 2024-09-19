import React, { useState } from 'react';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import FormInput from "./common/InputField";

export default function EditCustomer({ customer, onClose }) {
    const supabase = useSupabaseClient();
    const [formData, setFormData] = useState({
        name: customer.name,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        email: customer.email,
        phone: customer.phone,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('customers')
                .update(formData)
                .eq('id', customer.id);
            if (error) throw error;
            onClose();
        } catch (error) {
            console.error(error);
            alert('Error updating customer');
        }
    }

    const inputFields = [
        { label: "Name", name: "name" },
        { label: "Address", name: "address" },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "ZIP", name: "zip" },
        { label: "Email", name: "email" },
        { label: "Phone", name: "phone" },
    ];
    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {inputFields.map(({ label, name }) => (
                <div key={name}>
                    <label>{label}</label>
                    <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}
