
import React, {useState, useEffect} from "react";
import EstimatorDetails from "../EstimatorDetails/EstimatorDetails";
import CustomerDetails from "../CustomerDetails/CustomerDetails";




export default function ViewQuote({customer,signee,companyPhone,companyEmail,...props}) {
  let totalPrice = 0;
    console.log('render quote component:',props);


  return (
     <div className="z-[200] w-full h-full bg-slate-100 absolute top-0 left-0">
     <div className="flex justify-center flex-col p-12 gap-8 max-w-[92rem] mx-auto">
      <div className="flex gap-8">
          <CustomerDetails className={"w-full"} customer={customer}/>
          <EstimatorDetails className={"w-full"}
              estimatorDetails={{signee,companyPhone,companyEmail}}/>
      </div>
      <h3 className="text-center text-xl">Proposed Work Scope</h3>
      <>


     { 
        props.options.sort((a,b) => a.order - b.order).map(option => (
           <div>
          <p className="font-bold">{option.title}</p>
          </div>
        ))
       }
       </>
       <>

{props.customFields && 
<>
 <h3 className="text-center text-xl">Additional Work Description</h3>

{props.customFields.map(field => (
 <div>
  <p className="font-bold">{field}</p>
</div>
))
}
</>
}
</>
         <table className="table-auto border-collapse border border-slate-500">
        <thead>
        <tr>
      <th>Product Description</th>
      <th>Total Cost</th>
      <th>Payments Over 84 Months</th>
      <th>Payments Over 36 Months</th>
        </tr>
        </thead>
        <tbody>
       { props.lineItems && Object.values(props.lineItems).map(item => {
         totalPrice = +item.price + +totalPrice;
         return (
        <tr className="">
          <td className="font-bold border border-slate-600 p-1">{item.description}</td>
          <td className="border border-slate-600 p-1">${(+item.price)}</td>
          <td className="border border-slate-600 p-1">${(+item.price/84).toFixed(2)}</td>
          <td className="border border-slate-600 p-1">${(+item.price/36).toFixed(2)}</td>

        </tr>
  
       )}
       )
       }
       <tr>
       <td className="border border-slate-600 p-1">Total for all work customer quoted:</td>
       <td className="border border-slate-600 p-1">${totalPrice}</td>
       <td className="border border-slate-600 p-1">Without Interest Added</td>
       <td className="border border-slate-600 p-1">Without Interest Added</td>



       </tr>
        </tbody>
        </table>
      <div className="flex flex-col gap-10 my-6">
        {props.notes && 
       <div className="p-4"><p>Extra Information: {props.notes}</p></div>
        }
       <div className="flex gap-12 justify-center">
       <p>Company Phone: {props.companyPhone}</p>
       <p>Company Address: {props.companyAddress}</p>

       </div>
       </div>
       <button
         className="print:hidden"
         onClick={() =>{
             props.setDocVisible(false);
             props.setCreateVisible(false);
         } }
       >
        Close
       </button>
         </div>
    </div>

  )
}