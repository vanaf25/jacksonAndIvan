import React from "react";
import { useState, useEffect } from "react"
import CreateDoc from "./CreateDoc"
import DashboardViewDoc from "./DashboardViewDoc"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope,faHouse, faToolbox, faUserPlus } from '@fortawesome/free-solid-svg-icons'



export default function Dashboard(props) {


  // console.log("cust", customers);
  // console.log("user", username);
  const [createVisible, setCreateVisible] = useState(false)
  const [viewDocVisible, setViewDocVisible] = useState(null)

  const sortedDocuments = props.documents ? props.documents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : []
  

  return (
    <div className="mt-12">
       <div className="flex gap-4">
          <h3 className="text-4xl text-slate-600">Your Documents</h3>
      </div>
      <div className="w-full mt-20 flex flex-col gap-4 ">
        { sortedDocuments.length > 0 ? (
          sortedDocuments.map(document => (
            <>
            <div className="border-solid border p-8 border-slate-400 rounded-xl m-4 flex">
              <div>
              <p className="text-xl">{document.client}</p>
              <p className="text-lg"><FontAwesomeIcon icon={faToolbox}/> {document.service}</p>
              <p className="text-lg">${document.totalPrice}</p>
              <p className="text-sm"><span>{new Date(document.created_at).toDateString()}</span><span> {new Date(document.created_at).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span></p>
              </div>
              <button
                   onClick={() => setViewDocVisible(document.created_at)}
                   className=" basis-1/3 ml-auto bg-green-200"
                 >
                   View document
                 </button>
             </div>
              {viewDocVisible == document.created_at && <DashboardViewDoc options={document.fields}  signee={props.username} company={document.company} client={document.client} setDocVisible={setViewDocVisible} address={document.address} customer={props.customers.find(c => c.client_id === document.client_id)} service={document.service} totalPrice={document.totalPrice} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress}/>}
              </>
          ) )
        ) : (
          <p>No created documents</p>
        )

        }
      </div>
    


    


      </div>
      
  )
}


