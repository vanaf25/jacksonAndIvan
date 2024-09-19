import React, { useState, useEffect } from "react";
import { contractData } from "./contractData";
import EstimatorDetails from "./EstimatorDetails/EstimatorDetails";
import CustomerDetails from "./CustomerDetails/CustomerDetails";

const PaymentDetails = ({ totalPrice }) => (
    <div className="flex flex-col mt-8">
        {[
            { percent: 30, description: "Due within 3 days of executing this contract." },
            { percent: 45, description: "Due 5 days after the arrival of supplies or the start of work, whichever comes first." },
            { percent: 25, description: "Due upon 94% completion of the work and before any punch list is completed." }
        ].map(({ percent, description }) => (
            <div className="flex border border-solid border-slate-400 p-2 items-center" key={percent}>
                <div className="border-r border-slate-400 p-4 w-1/6">{percent}%</div>
                <div className="border-r border-slate-400 p-4 w-1/6">${(totalPrice * percent) / 100}</div>
                <div className="p-4 w-2/3">{description}</div>
            </div>
        ))}
    </div>
);

const Terms = ({ selectedTermsData, loading }) => (
    <>
        {loading && selectedTermsData.length > 0 ? (
            selectedTermsData.map((term, index) => (
                <div key={index}>
                    <p className="font-bold">{term.title}</p>
                    <p>{term.description}</p>
                </div>
            ))
        ) : (
            <p>No terms available at this time.</p>
        )}
    </>
);

export default function DashboardViewDoc({ signee, companyEmail, companyPhone, ...props }) {
    const [selectedTermsData, setSelectedTermsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!props.service) return;

        const serviceTerms = contractData.find((service) => service.name === props.service);
        if (serviceTerms) {
            setSelectedTermsData(serviceTerms.terms);
        }
        setLoading(true);
    }, [props?.service]);

    return (
        <div className="z-[200] w-screen min-h-screen bg-slate-100 absolute top-0 left-0">
            <div className="flex justify-center flex-col p-12 gap-8 max-w-[92rem] mx-auto">
                <div className="flex gap-8">
                    <CustomerDetails customer={props.customer} />
                    <EstimatorDetails estimatorDetails={{ signee, companyEmail, companyPhone }} />
                </div>

                <div>
                    <p>Hereafter company refers to {props.company}</p>
                    <p>Hereafter client, owner, and customer refers to {props.client} and their spouse or life partner.</p>
                </div>

                <p className="text-center">Work description and scope</p>

                {props.options?.sort((a, b) => a.order - b.order).map((option) => (
                    <div key={option.title}>
                        <p className="font-bold">{option.title}</p>
                        <p>{option.description}</p>
                    </div>
                ))}

                <p>
                    All work described above will be accomplished in accordance with the company's Standard Installation System and
                    Terms and Conditions, which is part of this Proposal and Agreement, and incorporated herein by reference.
                </p>

                <h3 className="text-center">Terms and conditions</h3>

                {props.totalPrice > 0 && (
                    <div>
                        <p>
                            All labor and materials necessary to perform the work will be provided for a sum of{" "}
                            <span className="font-bold">${props.totalPrice}</span> (the "Contract Price"). Payments must be made as follows:
                        </p>
                        <PaymentDetails totalPrice={props.totalPrice} />
                    </div>
                )}

                <Terms selectedTermsData={selectedTermsData} loading={loading} />

                <div className="flex flex-col gap-10 my-6">
                    {["client", "spouse", "company representative"].map((signer) => (
                        <div className="flex flex-row gap-4" key={signer}>
                            <p className="basis-2/12">Signature of {signer}</p>
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

                <button className="print:hidden" onClick={() => props.setDocVisible(false)}>
                    Close
                </button>
            </div>
        </div>
    );
}