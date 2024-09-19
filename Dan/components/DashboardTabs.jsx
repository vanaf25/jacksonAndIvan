import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Customers from './Customers'
import Documents from './Documents'

const tabStyles = {
  fontSize: '20px',
  padding: '10px 60px',
  cursor: 'pointer',
  opacity: 0.6,
  border: '0',
  outline: '0',
  color: '#1e293b'
};

const activeTabStyles = {
  border: 'none',
  borderBottom: '2px solid #1e293b',
  opacity: 1,
};

const buttonGroupStyles = {
  display: 'flex',
  width: '100%',
  overflowX: 'scroll',
};

const types = ['Clients', 'Documents'];



export default function DashboardTabs(props) {
  const [active, setActive] = useState(types[0]);
  function tabSwticher(){
    switch(active){
        case 'Clients': return <Customers username={props.username} company={props.company} customers={props.customers} documents={props.documents} setCustomerData={props.setCustomerData} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />;
        case 'Documents': return <Documents username={props.username} company={props.company} customers={props.customers} documents={props.documents} setCustomerData={props.setCustomerData} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />;
        default: return <Dashboard username={props.username} company={props.company} customers={props.customers} documents={props.documents} setCustomerData={props.setCustomerData} companyPhone={props.companyPhone} companyEmail={props.companyEmail} companyAddress={props.companyAddress} />
    }
  }

  console.log('cactive:',active);
  return (
    <div className='w-full'>
      <div style={buttonGroupStyles}>
        {types.map(type => (
          <button
          className={""}
            key={type}
            style={active === type ? {...tabStyles, ...activeTabStyles} : tabStyles}
            onClick={() => setActive(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {tabSwticher(active)}
    </div>
  );
}
