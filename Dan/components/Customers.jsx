import React, {useEffect} from "react";
import { useState } from "react"
import NewQuote from "./Document/NewQuote"
import ViewQuote from "./Document/ViewQuote";
import ViewContract from "./Document/ViewContract";
import ViewInstructions from "./Document/ViewInstructions"
import NewContract from "./Document/NewContract"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { FontAwesomeIcon, faCircleUser } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope,faHouse, faToolbox, faPencil } from '@fortawesome/free-solid-svg-icons'
import EditCustomer from './EditCustomer';
import InputField from './common/InputField'


export default function Customers(props) {
  console.log('custom render!');
  const supabase = useSupabaseClient()
  const user = useUser()



  // console.log("cust", customers);
  // console.log("user", username);
  const [createVisible, setCreateVisible] = useState()
  console.log('createVisible:',createVisible);
  const [progressDoc, setProgressDoc] = useState()
  const [viewDocVisible, setViewDocVisible] = useState(null)
  console.log('view:',viewDocVisible);
  const [instructionsDocVisible, setInstructionsDocVisible] = useState(null)
  const [editCustomer, setEditCustomer] = useState(null);

  const [addModal, setAddModal] = useState(false)
  const [customerDetails, setCustomerDetails] = useState({
    name: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    email: null,
    phone: null,
  });

  const inputs = [
    { id: "name", label: "Name", type: "text", autoComplete: "name" },
    { id: "email", label: "Email", type: "text" },
    { id: "phone", label: "Phone", type: "tel", pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" },
    { id: "address", label: "Address", type: "text", autoComplete: "street-address" },
    { id: "city", label: "City", type: "text" },
    { id: "state", label: "State", type: "text" },
    { id: "zip", label: "Zip", type: "text" },

  ];
  const handleChange = (id, value) => {
    setCustomerDetails(prevDetails => ({
      ...prevDetails,
      [id]: value,
    }));
  };
  function handleEditCustomer(customer) {
    setEditCustomer(customer.client_id);
  }

  useEffect(() => {
    console.log('Customer component render!');
  }, []);
  function handleCloseEdit() {
    setEditCustomer(null);
  }
  async function addCustomer() {
    try {
      const { data, error } = await supabase
          .from('customers')
          .insert([{
            created_by: user.id,
            ...customerDetails
          }])
          .single();

      if (error) throw error;

      // Reset form
      setCustomerDetails({
        name: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        email: null,
        phone: null,
      });

      alert("Client added");
    } catch (error) {
      alert("Error adding client");
      console.error('Error adding customer', error);
    }
  }
  async function removeCustomer(id) {
    const shouldDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!shouldDelete) return;

    try {
      const { data, error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      alert(`Customer with ID ${id} has been deleted.`);
      // Refresh the list of customers by fetching the data again
    } catch (error) {
      console.error(`Error deleting customer with ID ${id}`, error);
    }
  }

  return (
  <div className="">
        <div className="text-left my-12">
      {props.username ? (
        <>
            <div className="flex gap-4">
            <h3 className="text-4xl text-slate-600">Welcome, {String(props.username)}</h3>
      </div>
        </>
      ) : (
      <h3 className="text-2xl text-slate-600">Welcome, click the <FontAwesomeIcon icon={faCircleUser}/> icon in the top left to setup your account.</h3>
      )
    }


    </div>
    <>
    <div className="flex gap-4">
      <h3 className="text-2xl text-slate-600">Your Clients</h3>
     <button
      className="bg-green-200"
      onClick={() => setAddModal(val => !val)}
       >
        {addModal ? (
            "Cancel"
        ): (
          "Add New Client"
        )}
      </button>
      </div>

    {
      addModal && (
        <>
          {inputs.map(({ id, label, type, autoComplete, pattern }) => (
               <InputField
                  onChange={e => handleChange(id, e.target.value)}
                  label={label} id={id} type={type}  autoComplete={autoComplete}
                  pattern={pattern}
                  value={customerDetails[id] || ""} />
          ))}
      <button
         className="bg-green-200"
         onClick={() => addCustomer()}
       >
        Add Client
       </button>
       </>
             )
            }
      {props.customers ? (
        <>
        <div className="w-full gap-2 flex flex-col">
          {Object.values(props.customers)
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map(customer => (
            <>
              <div
              className="w-full p-12 border-solid border border-slate-600 rounded-xl my-10"
                key={customer.id + "nameCard"}>
                  { editCustomer != null & editCustomer == customer.client_id ? (
                    <>
                   <EditCustomer customer={customer} onClose={handleCloseEdit} />
                   {/* <button onClick={() => removeCustomer(customer.id)}>Delete client</button> */}
                   </>

                  ) : (
                    <div className="flex">
                    <div>
                    <p className="w-full text-2xl ">{customer.name}</p>
                    <p className="w-full text-lg "><FontAwesomeIcon icon={faHouse}/> {customer.address}</p>
                    <p className="w-full text-lg ">{customer.city}, {customer.state}</p>
                    <p className="w-full text-md "><FontAwesomeIcon icon={faPhone}/> {customer.phone} <FontAwesomeIcon icon={faEnvelope}/> {customer.email}</p>
                    </div>
                    <FontAwesomeIcon className="ml-auto" onClick={() => handleEditCustomer(customer)} icon={faPencil}/>
                    </div>
                  )
                  }

                 <div className="flex gap-4 items-end">
                 <p className="text-2xl mt-8">Quotes:</p>
                  <button
                   onClick={() => setCreateVisible(customer.client_id)}
                   className="ml-auto bg-green-200"
                 >
                   New Quote
                 </button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                 <p className="text-2xl basis-full">Contracts:</p>
                 { props.documents ? (
                    props.documents
                    .filter(document => document.client_id == customer.client_id)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map(document => {
                      switch (document.type) {
                        case "quote":
                          return (
                            <>
                             <div className="rounded-xl m-4 flex flex-col order-first">
                               <p className="text-xl capitalize"><FontAwesomeIcon icon={faToolbox}/> {document.service} | {document.type}</p>
                               <p className="text-md"><span>{new Date(document.created_at).toDateString()}</span><span> {new Date(document.created_at).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span></p>
                               <div className="flex gap-1">
                               <button
                                    onClick={() => setViewDocVisible(document.id)}
                                    className="bg-green-200"
                                  >
                                    View
                                  </button>
                                 <button
                                    onClick={() => setProgressDoc(document.id)}
                                    className="bg-green-200"
                                  >
                                    New Contract
                                  </button>
                                  </div>
                               {viewDocVisible == document.id && <ViewQuote lineItems={document.line_items} customFields={document.custom_fields} options={document.fields} signee={props.username} company={props.company} customer={customer} address={props.address} setCreateVisible={setCreateVisible} setDocVisible={setViewDocVisible} service={document.service} notes={document.notes} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />}
                               {progressDoc === document.id && <NewContract options={document.fields} type={document.type}  signee={props.username} company={document.company} client={document.client} setDocVisible={setViewDocVisible} setCreateVisible={setProgressDoc} address={document.address} customer={customer} service={document.service} totalPrice={document.totalPrice} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} lineItems={document.line_items} customFields={document.custom_fields} notes={document.notes}/>}
                             </div>
                           </>
                             )
                        case "contract":
                          return (
                            <>

                             <div className="m-4 flex flex-col">
                               <p className="text-xl capitalize"><FontAwesomeIcon icon={faToolbox}/> {document.service} | {document.type}</p>
                               <p className="text-md"><span>{new Date(document.created_at).toDateString()}</span><span> {new Date(document.created_at).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span></p>
                               <div className="flex gap-1">
                               <button
                                    onClick={() => setViewDocVisible(document.id)}
                                    className="bg-green-200"
                                  >
                                    View
                                  </button>
                                 <button
                                    onClick={() => setInstructionsDocVisible(document.id)}
                                    className="bg-green-200"
                                  >
                                    Job Instructions
                                  </button>
                                  </div>

                               {viewDocVisible === document.id && <ViewContract options={document.fields} customFields={document.custom_fields} signee={props.username} company={document.company} client={document.client} setDocVisible={setViewDocVisible} setCreateVisible={setCreateVisible} address={document.address} customer={customer} service={document.service} totalPrice={document.totalPrice} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress}/>}
                               {instructionsDocVisible === document.id && <ViewInstructions options={document.fields} company={document.company} client={document.client} setDocVisible={setInstructionsDocVisible} address={document.address} customer={customer} service={document.service} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} instructions={document.instructions}/>}

                             </div>
                           </>
                             )
                      }
                     }
                  ))
               : (
                <p>No documents created for this client</p>
              )
            }
            </div>

                 </div>

              { createVisible === customer.client_id && <NewQuote signee={props.username} company={props.company} customer={customer} client={customer.name} setCreateVisible={setCreateVisible} address={customer.address} setCustomerData={props.setCustomerData} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress}/>}
            </>
          ))}
        </div>

           </>
      )
    : (
      <p>Add a client to get started</p>
    )
    }


      </>
      </div>

  )
}


