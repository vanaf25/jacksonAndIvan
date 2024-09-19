
import React from "react";
import { useState, useEffect } from "react"
import ViewQuote from "./ViewQuote"
import {contractData} from "../contractData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"





export default function NewQuote(props) {
  const [serviceType, setServiceType] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [docVisible, setDocVisible] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [fields, setFields] = useState(['']); 
  const [customFields, setCustomFields] = useState([]); 
  const [notes, setNotes] = useState(''); 
  const [lineItems, setLineItems] = useState([{ description: '', price: '' }]); 
  const supabase = useSupabaseClient()
  const user = useUser()
  console.log('Quote component render!');

  console.log(props.customer)


  async function addDocument() {
    try {
      // Get the authenticated use
  
      // Insert a new document into the database
      const { data, error } = await supabase
        .from('documents')
        .insert([{ created_by: user.id, fields: optionsSelected, service: serviceType.name, client: props.customer.name, client_address: props.customer.address, company: props.company, type: "quote", custom_fields: customFields, line_items: lineItems, notes: notes, client_id: props.customer.client_id }])
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

  const handleLineItemChange = (index, field, value) => {
    const newLineItems = [...lineItems];
    newLineItems[index][field] = value;
    setLineItems(newLineItems);
  };

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { description: '', price: '' }]);
  };

  const handleCustomFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
    setCustomFields(newFields.filter(field => field !== ''));
  };

  const handleAddField = () => {
    setFields([...fields, '']);
  };

  function handleOnChange(option, position) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    if (optionsSelected.includes(option)) {
      setOptionsSelected(optionsSelected.filter((opt) => opt !== option));
    } else {
      setOptionsSelected([...optionsSelected, option]);
    }
  }

  return (
    <>
      <div className={`z-[100] w-screen h-screen bg-slate-100 absolute top-0 left-0 ${docVisible && 'hidden'}`}>
        <div className="max-w-[92rem] mx-auto">
        <div className="text-4xl justify-items-end transition-all ease-in-out z-100 fill-slate-800 cursor-pointer absolute left-0 ml-4 mt-12">
          <div onClick={() => {props.setCreateVisible(false)}}>
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </div>
        </div>
        <div className="flex justify-center flex-col m-20">
        <h3 className="text-2xl text-slate-600">Service Options</h3>
          {serviceType ? (
            serviceType.fields.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  handleOnChange(option, index);
                }}
                className={`flex flex-row border-solid p-8 rounded-xl m-4 ${
                  checkedState[index] ? "border-emerald-500 border-4" : "border border-slate-400"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white border-solid border rounded-sm mr-4 cursor-pointer flex justify-center items-center ${
                    checkedState[index] ? "border-emerald-500" : "border-slate-400"
                  }`}
                >
                  { checkedState[index]
                  ? <FontAwesomeIcon className="text-emerald-500" icon={faCheck} />
                  : ""
                  }
                </div>
                <p className="cursor-pointer">{option.title}</p>
              </div>
            ))
          ) : (
            <>
              <h3 className="text-4xl text-slate-600">Select Service</h3>
              <div className="grid grid-cols-2 md:grid-col-3 gap-4 mt-20">
                {contractData.map((service) => (
                  <button
                    key={service.id}
                    className="bg-emerald-500"
                    onClick={() => {
                      setServiceType(service);
                      setCheckedState(new Array(service.fields.length).fill(false));
                    }}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </>
          )}
          {serviceType && (
            <div className="m-4 flex flex-col gap-8">
              <div>
              {fields.map((field, index) => (
                 <input
                  className={`flex mb-8 flex-row p-8 rounded-xl border-solid border border-emerald-500 `}
                   key={index}
                   type="text"
                   placeholder="Additional work description"
                   value={field}
                   onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                 />
               ))}
               <div onClick={handleAddField} className="w-full flex bg-emerald-500 rounded-full p-2">
               <FontAwesomeIcon className="mx-auto" icon={faPlus}  />
               </div>
              </div>
              <div>
              <h3 className="text-2xl text-slate-600 mb-2">Pricing Info</h3>
      {lineItems.map((lineItem, index) => (
        <div key={index} className="flex">
          <input
            type="text"
            value={lineItem.description}
            placeholder="Description"
            onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
          />
          <input
            type="number"
            value={lineItem.price}
            placeholder="Price"
            onChange={(e) => handleLineItemChange(index, 'price', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddLineItem}>Add Line Item</button>
    </div>
    <div>
    <h3 className="text-2xl text-slate-600 mb-2">Notes to client</h3>

    <input
            type="text"
            value={notes}
            placeholder="Notes to client"
            onChange={(e) => setNotes(e.target.value)}
          />
      </div>
              <button
                className="bg-emerald-500"
                onClick={() => addDocument() & setDocVisible(true) }
              >
                Generate Quote
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

    { docVisible & optionsSelected.length > 0 && (
      <ViewQuote lineItems={lineItems} customFields={customFields} options={optionsSelected} signee={props.signee} company={props.company} customer={props.customer} address={props.address} setCreateVisible={props.setCreateVisible} setDocVisible={setDocVisible} setCustomerData={props.setCustomerData} terms={serviceType.terms} service={serviceType.name} notes={notes} totalPrice={totalPrice} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />
    )

    }

      </>
  )
}


