import React from 'react';

const EstimatorDetails = ({estimatorDetails,...props}) => {
    return (
        <div {...props}>
            <h3>Estimator info</h3>
            <p>Name: {estimatorDetails.signee}</p>
            <p>Phone: {estimatorDetails.companyPhone}</p>
            <p>Email: {estimatorDetails.companyEmail}</p>
        </div>
    );
};

export default EstimatorDetails;