
import React from "react";
import { useState, useEffect } from "react"
import ViewDoc from "./ViewDoc"
import {contractData} from "./contractData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'




export default function CreateDoc(props) {
  const [serviceType, setServiceType] = useState(null);
  const [checkedState, setCheckedState] = useState(null);
  const [docVisible, setDocVisible] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

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
      <div className="z-[100] w-screen h-screen bg-slate-100 absolute top-0 left-0">
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
                  checkedState[index] ? "border-green-200 border-4" : "border border-slate-400"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white border-solid border rounded-sm mr-4 cursor-pointer flex justify-center items-center ${
                    checkedState[index] ? "border-green-200" : "border-slate-400"
                  }`}
                >
                  { checkedState[index]
                  ? <FontAwesomeIcon className="text-green-200" icon={faCheck} />
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
                    className="bg-green-200"
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
            <div className="m-8 flex flex-col gap-8">
              <div className="flex">
               <h3 className="text-2xl text-slate-600">Total price for services</h3>
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
              <button
                className="bg-green-200"
                onClick={() => setDocVisible(true)}
              >
                Generate Document
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

    { docVisible & optionsSelected.length > 0 && (
      <ViewDoc options={optionsSelected} signee={props.signee} company={props.company} customer={props.customer} address={props.address} setCreateVisible={props.setCreateVisible} setDocVisible={setDocVisible} setCustomerData={props.setCustomerData} terms={serviceType.terms} service={serviceType.name} totalPrice={totalPrice} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />
    )

    }

      </>
  )
}


