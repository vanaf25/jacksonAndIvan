import React from "react";
import { useState, useEffect } from "react"
import CreateDoc from "./CreateDoc"
import DashboardViewDoc from "./DashboardViewDoc"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faFileInvoice } from '@fortawesome/free-solid-svg-icons'



export default function Dashboard(props) {
  // console.log("cust", customers);
  // console.log("user", username);
  const [createVisible, setCreateVisible] = useState(false)
  const [viewDocVisible, setViewDocVisible] = useState(null)
  return (
    <>
    <div className="text-left mt-12">
      {props.username ? (
        <>
            <div className="flex gap-4">
            <h3 className="text-4xl text-slate-600">Welcome, {String(props.username)}</h3>
      </div>
        <p>Select a tab above or a quick start option below to get started.</p>
        </>
      ) : (
      <h3 className="text-2xl text-slate-600">Welcome, click the <FontAwesomeIcon icon={faCircleUser}/> icon in the top left to setup your account.</h3>
      )
    }
    
 
    </div>
      {props.customers ? (
        <>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-20 gap-2">
          {Object.values(props.customers).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(customer => (
            <>
              <div
              className="w-full h-full rounded-lg p-4 border-solid border border-slate-400 flex flex-col items-center justify-center text-center"
                key={customer.id + "nameCard"}
                 >
                  <p className="w-full">{customer.name}</p>
                  <p className="w-full">{customer.address}</p>
                  <button
                   onClick={() => setCreateVisible(true)}
                   className="bg-green-200"
                 >
                  <FontAwesomeIcon icon={faFileInvoice}/> Create Document
                 </button>
                 </div>
              
                 {createVisible && <CreateDoc signee={props.username} company={props.company} customer={customer} client={customer.name} setCreateVisible={setCreateVisible} address={customer.address} setCustomerData={props.setCustomerData} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />}

              {/* <div
                key={customer.id + "addressCard"}
              >
                <p>{customer.address}</p>
              </div> */}
            </>
          ))}
        </div>
           </>
      )
    : (
      <p>Use the clients tab above to add a new client.</p>
    )
    }


      </>
      
  )
}