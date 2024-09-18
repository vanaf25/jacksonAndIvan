import React, { useState } from 'react';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

export default function EditCustomer({ customer, onClose }) {
  const supabase = useSupabaseClient();
  const [name, setName] = useState(customer.name);
  const [address, setAddress] = useState(customer.address);
  const [city, setCity] = useState(customer.city);
  const [state, setState] = useState(customer.state);
  const [zip, setZip] = useState(customer.zip);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('customers')
        .update({ name, address, city, state, zip, email, phone })
        .eq('id', customer.id);
      if (error) throw error;
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error updating customer');
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />


        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />


        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />

        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />

        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}