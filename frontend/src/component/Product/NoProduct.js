import React from 'react';
import MetaData from "../layout/MetaData"; 
import "./NoProducts.css"
const NoProduct = () => {
    return (
        <>
            <MetaData title="No Products Found" />
            <div className="noProductContainer">
                <h2>No Products Found</h2>
                <p>Sorry, there are no products that match your search.</p>
            </div>
        </>
    );
};

export default NoProduct;
