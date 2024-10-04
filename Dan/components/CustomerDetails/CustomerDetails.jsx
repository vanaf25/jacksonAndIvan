import React from 'react';

const CustomerDetails = ({customer,...rest}) => {
    return (
        <div {...rest}>
            <h3>Customer info</h3>
            <p>Name: {customer.name}</p>
            <p>Address: {customer.address}</p>
            {customer.city ?
                <p>{customer.city}, {customer.state}. {customer.zip}</p>:""
            }
            <p>Phone: {customer.phone}</p>
            <p>Email: {customer.email}</p>
        </div>
    );
};

export default CustomerDetails;