
import React, {useState, useEffect} from "react";
import {contractData} from "./contractData"



export default function DashboardViewDoc(props) {
  const [selectedTermsData, setSelectedTermsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
        let serviceTerms = Array.from(contractData).filter((service) => {
          console.log(service, props.service)
          return service.name === props.service;
        });
        setSelectedTermsData(serviceTerms[0].terms);
        console.log("st", serviceTerms[0].terms)

        setLoading(true);


  }, []);



  console.log("customer:",props.client)
  console.log("address:",props.address)
  console.log("signee:",props.signee)
  console.log("company:",props.company)

  return (
    <>
     <div className="z-[200] w-screen min-h-screen bg-slate-100 absolute top-0 left-0">
     <div className="flex justify-center flex-col p-12 gap-8 max-w-[92rem] mx-auto">
      <div className="flex gap-8">
        <div>
          <h3>Customer info</h3>
          <p>Name: {props.customer.name}</p>
          <p>Address: {props.customer.address}</p>
          <p>Phone: {props.customer.phone}</p>
          <p>Email: {props.customer.email}</p>


        </div>
        <div>
          <h3>Estimator info</h3>
          <p>Name: {props.signee}</p>
          <p>Phone: {props.companyPhone}</p>
          <p>Email: {props.companyEmail}</p>

        </div>
      </div>

      <div>
        <p>Hereafter company refers to {props.company}</p>
        <p>Hereafter client, owner and customer refers to {props.client} and their spouse or life partner.</p>
      </div>

      <p className="text-center">Work description and scope</p>


     { 
        props.options.sort((a,b) => a.order - b.order).map(option => (
           <div>
          <p className="font-bold">{option.title}</p>
          <p>{option.description}</p>
          </div>
        ))
       }

       <p>All work described above will be accomplished in accordance with companies Standard Installation System and Terms and Conditions which is part of this Proposal and Agreement and incorporated herein by reference. The work will be guaranteed in accordance with companies Limited Labor Warranty.</p>

       <h3 className="text-center">Terms and conditions</h3>

       { props.totalPrice > 0 && (
        <div>
        <p>All labor and material necessary to perform the work described above will be furnished for the sum of <span className="font-bold">${props.totalPrice}</span> (the "Contract Price") </p>
        <p>all payments must be made as follows:</p>
        <div className="flex flex-col mt-8">
        <div className="flex border border-solid border-slate-400 p-2 items-center">
          <td className="border-r border-slate-400 p-4">30%</td>
          <td className="border-r border-slate-400 p-4">${props.totalPrice * 0.3}</td>
          <td className="p-4">Due within 3 days of executing this contract.</td>
        </div>
        <div className="flex border border-solid border-slate-400 p-2 items-center">
          <td className="border-r border-slate-400 p-4">45%</td>
          <td className="border-r border-slate-400 p-4">${props.totalPrice * 0.45}</td>
          <td className="p-4">Due 5 days after the arrival of supply’s and the start of work whichever comes first.</td>
        </div>
        <div className="flex border border-solid border-slate-400 p-2 items-center">
          <td className="border-r border-slate-400 p-4">25%</td>
          <td className="border-r border-slate-400 p-4">${props.totalPrice * 0.25}</td>
          <td className="p-4">Due and payable at companies office at the address below, in full, upon 94% (substantial completion) of completion of the work and prior to the completion of any punch out list submitted to the company by the Customer. Past due accounts will have a delinquent charge imposed on the balance at the rate of 10% per month. If the company hires an attorney to collect any sums owed, Customer agrees to pay attorney's fees and costs of collection including additional fees for time spend by the company on collecting from the Customer. All work described above will be accomplished in accordance with the Company's Standard Installation Process and Standard General Conditions which is part of this Contract and Agreement and or is incorporated herein by reference.  The work will be guaranteed in accordance with The Company's Limited Labor Warranty which is not part of this contract and will be issued upon completion of the worked and only after all bills are paid by the Customer.</td>
        </div>
        </div>



        </div>
       )

       }

       { loading &&
        selectedTermsData.map(term => (
          <div>
          <p className="font-bold">{term.title}</p>
          <p>{term.description}</p>
          </div>
        ))
       }
      <div className="flex flex-col gap-10 my-6">

       <div className="flex flex-row gap-4">
        <p className="basis-2/12">Signature of client</p>
        <span className=" basis-6/12 border-b border-slate-400"></span>
        <p className="mt-auto">Date</p>
        <span className="basis-3/12 border-b border-slate-400"></span>
       </div>
       <div className="flex flex-row gap-4">
        <p className="basis-2/12">Signature of spouse</p>
        <span className=" basis-6/12 border-b border-slate-400"></span>
        <p className="mt-auto">Date</p>
        <span className="basis-3/12 border-b border-slate-400"></span>
       </div>
       <div className="flex flex-row gap-4">
        <p className="basis-2/12">Signature of company representative</p>
        <span className=" basis-6/12 border-b border-slate-400"></span>
        <p className="mt-auto">Date</p>
        <span className="basis-3/12 border-b border-slate-400"></span>
       </div>
       <div className="flex gap-12 justify-center">
       <p>Company Phone: {props.companyPhone}</p>
       <p>Company Address: {props.companyAddress}</p>

       </div>
       </div>
       <button
         className="print:hidden"
         onClick={() => props.setDocVisible(false)}
       >
        Close
       </button>
         </div>
    </div>
      


      </>
  )

  

}