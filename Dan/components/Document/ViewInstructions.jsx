
import React, {useState, useEffect} from "react";
import {contractData} from "../contractData"



export default function ViewContract(props) {



  return (
    <>
     <div className="z-[200] w-screen min-h-screen bg-slate-100 absolute top-0 left-0">
     <div className="flex justify-center flex-col p-12 gap-8 max-w-[92rem] mx-auto">
      <div className="flex gap-8">
        <div>
          <h3>Customer info</h3>
          <p>Name: {props.customer.name}</p>
          <p>Address: {props.customer.address}</p>
        </div>
      </div>

      {
    props.instructions && 
    <div><p>Special Instructions: {props.instructions}</p></div>
  }


      <h3 className="text-center text-xl">Work description and scope</h3>


     { 
        props.options.sort((a,b) => a.order - b.order).map(option => (
           <div>
          <p className="font-bold">{option.title}</p>
          <p>{option.description}</p>
          </div>
        ))
       }

<>

{props.customFields && props.customFields.map(field => (
 <div>
  <h3 className="text-center text-xl">Other Work</h3>
  <p className="font-bold">{field}</p>
</div>
))

}
</> 

       <div className="flex gap-12 justify-center">
       <p>Company Phone: {props.companyPhone}</p>
       <p>Company Address: {props.companyAddress}</p>

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