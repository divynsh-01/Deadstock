import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Sell.css'; 

const Sell = () => {
    const navigate = useNavigate(); 

    const handleBulkSellClick = () => {
        navigate('/bulksell'); 
    };

    const handleNormalSellClick = () => {
        navigate('/normalsell'); 
    };

    return (
        <div className="sellPageContainer">
            <h1 className="pageHeading">Sell Your Items with Ease</h1>
            <p className="pageDescription">
                Whether you’re looking to sell in bulk or individually, we offer a simple and secure platform to help you get the best value for your deadstock items.
            </p>

            <div className="sellSection">

                <div className="sellCard">
                    <h3>Bulk Sell</h3>
                    <p>
                        Looking to sell in large quantities? Our bulk selling platform allows you to quickly list and get offers for your items in bulk.
                    </p>
                    <button onClick={handleBulkSellClick}>Start Bulk Selling</button>
                </div>

                <div className="sellCard">
                    <h3>Normal Sell</h3>
                    <p>
                        Prefer selling one item at a time? Our normal selling feature is perfect for listing and selling individual items quickly and efficiently.
                    </p>
                    <button onClick={handleNormalSellClick}>Start Normal Selling</button>
                </div>
            </div>
        </div>
    );
};

export default Sell;
