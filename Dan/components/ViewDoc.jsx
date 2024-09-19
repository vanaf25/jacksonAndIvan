import React from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import EstimatorDetails from "./EstimatorDetails/EstimatorDetails";

export default function ViewDoc({customer,signee,companyPhone,companyEmail,...props}) {
    const supabase = useSupabaseClient();
    const user = useUser();

    async function addDocument() {
        try {
            const { data, error } = await supabase
                .from('documents')
                .insert([{
                    created_by: user.id,
                    fields: props.options,
                    service: props.service,
                    client: props.customer.name,
                    client_address: props.customer.address,
                    company: props.company,
                    totalPrice: props.totalPrice,
                    client_id: props.customer.client_id,
                }])
                .single();

            if (error) throw error;

            alert("Document saved!");
            props.setCreateVisible(false);
        } catch (error) {
            alert("Error adding document: ", error);
            console.error('Error adding document', error);
        }
    }

    return (
        <div className="z-[200] w-screen min-h-screen bg-slate-100 absolute top-0 left-0">
            <div className="flex justify-center flex-col p-12 gap-8 max-w-[92rem] mx-auto">
                <div className="flex gap-8">
                    <CustomerDetails customer={customer}/>
                    <EstimatorDetails estimatorDetails={{signee,companyPhone,companyEmail}}/>
                </div>

                <div>
                    <p>Hereafter company refers to {props.company}</p>
                    <p>Hereafter client, owner and customer refers to {props.client} and their spouse or life partner.</p>
                </div>

                <p className="text-center">Work description and scope</p>
                {props.options.sort((a, b) => a.order - b.order).map(option => (
                    <div key={option.title}>
                        <p className="font-bold">{option.title}</p>
                        <p>{option.description}</p>
                    </div>
                ))}

                <p>All work described above will be accomplished in accordance with the company's Standard Installation System and Terms and Conditions which is part of this Proposal and Agreement and incorporated herein by reference. The work will be guaranteed in accordance with the company's Limited Labor Warranty.</p>

                <h3 className="text-center">Terms and conditions</h3>
                {props.totalPrice > 0 && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="border border-slate-400 p-2">Payment Percentage</th>
                            <th className="border border-slate-400 p-2">Amount</th>
                            <th className="border border-slate-400 p-2">Due Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border border-slate-400">
                            <td className="border border-slate-400 p-2">30%</td>
                            <td className="border border-slate-400 p-2">${(props.totalPrice * 0.3).toFixed(2)}</td>
                            <td className="border border-slate-400 p-2">Due within 3 days of executing this contract.</td>
                        </tr>
                        <tr className="border border-slate-400">
                            <td className="border border-slate-400 p-2">45%</td>
                            <td className="border border-slate-400 p-2">${(props.totalPrice * 0.45).toFixed(2)}</td>
                            <td className="border border-slate-400 p-2">Due 5 days after the arrival of supplies and the start of work whichever comes first.</td>
                        </tr>
                        <tr className="border border-slate-400">
                            <td className="border border-slate-400 p-2">25%</td>
                            <td className="border border-slate-400 p-2">${(props.totalPrice * 0.25).toFixed(2)}</td>
                            <td className="border border-slate-400 p-2">Due upon substantial completion of the work.</td>
                        </tr>
                        </tbody>
                    </table>
                )}

                {props.terms.map((term, index) => (
                    <div key={index}>
                        <p className="font-bold">{term.title}</p>
                        <p>{term.description}</p>
                    </div>
                ))}

                <div className="flex flex-col gap-10 my-6">
                    {['client', 'spouse', 'company representative'].map((role, index) => (
                        <div key={index} className="flex flex-row gap-4">
                            <p className="basis-2/12">Signature of {role}</p>
                            <span className="basis-6/12 border-b border-slate-400"></span>
                            <p className="mt-auto">Date</p>
                            <span className="basis-3/12 border-b border-slate-400"></span>
                        </div>
                    ))}
                    <div className="flex gap-12 justify-center">
                        <p>Company Phone: {props.companyPhone}</p>
                        <p>Company Address: {props.companyAddress}</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center print:hidden">
                    <button onClick={() => props.setDocVisible(false)}>Edit</button>
                    <button className="bg-green-200" onClick={() => addDocument() && props.setCreateVisible(false)}>Save document</button>
                </div>
            </div>
        </div>
    );
}
