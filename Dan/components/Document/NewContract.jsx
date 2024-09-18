
import React from "react";
import { useState, useEffect } from "react"
import ViewContract from "./ViewContract"
import {contractData} from "../contractData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"





export default function NewContract(props) {
  const [serviceType, setServiceType] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [docVisible, setDocVisible] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [selectedTermsData, setSelectedTermsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient()
  const user = useUser()
  const [jobNotes, setJobNotes] = useState(''); 


console.log(props.lineItems, props.customFields)

  async function addDocument() {
    try {
      // Get the authenticated use
  
      // Insert a new document into the database
      const { data, error } = await supabase
        .from('documents')
        .insert([{ created_by: user.id, totalPrice: totalPrice, fields: props.options, service: props.service, client: props.customer.name, client_address: props.customer.address, company: props.company, type: "contract", custom_fields: props.customFields, line_items: props.lineItems, notes: props.notes, client_id: props.customer.client_id, instructions: jobNotes }])
        .single()
  
      if (error) {
        throw error
      }
  
      // Add the new document to the list of documents
      // setDocuments([...documents, data])
      alert("Document saved!")
      
    } catch (error) {
      alert("Error adding document ", error)
      console.error('Error adding document', error)
    }
  }

  useEffect(() => {
    
    let serviceTerms = Array.from(contractData).filter((service) => {
      console.log(service, props.service)
      return service.name === props.service;
    });
    setSelectedTermsData(serviceTerms[0].terms);
    console.log("st", serviceTerms[0].terms)

    setLoading(true);


}, []);


  return (
    <>
      <div className="z-[100] w-screen h-screen bg-slate-100 absolute top-0 left-0">
        <div className="max-w-[92rem] mx-auto">
        <div className="text-4xl justify-items-end transition-all ease-in-out z-100 fill-slate-800 cursor-pointer absolute left-0 ml-4 mt-12">
          <div onClick={() => {props.setCreateVisible(false)}}>
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </div>
        </div>
        <div className="flex justify-center flex-col m-20">

            <div className="m-8 flex flex-col gap-8">
              <div className="flex">
               <h3 className="text-2xl text-slate-600">Total contract price</h3>
             <div className="ml-auto gap-1 flex justify-center items-center">
               <p>$</p>
              <input
                className="relative rounded-lg border-2 border-solid border-green-200 px-4 bg-slate-200 shadow-inner shadow-transparent w-28"
                type="number"
                placeholder="99"
                onChange={(e) => setTotalPrice(e.target.value)}
              />
               </div>
              </div>
              <div>
              <input
            type="text"
            value={jobNotes}
            placeholder="Job notes and instructions (not shown to client)"
            onChange={(e) => setJobNotes(e.target.value)}
          />
              </div>

              <button
                className="bg-green-200"
                onClick={() =>  addDocument() & setDocVisible(true)}
              >
                Generate Contract
              </button>
            </div>

        </div>
        </div>
      </div>

    { docVisible && (
      <ViewContract lineItems={props.lineItems} notes={props.notes} customFields={props.customFields} options={props.options} signee={props.signee} company={props.company} customer={props.customer} address={props.address} setCreateVisible={props.setCreateVisible} setDocVisible={setDocVisible} setCustomerData={props.setCustomerData} terms={selectedTermsData} service={props.service} totalPrice={totalPrice} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />
      )

    }

      </>
  )
}


