import React, { useEffect } from 'react';
import './Home.css'; // Import the CSS file
import Product from "./Product.js";
import MetaData from '../layout/MetaData.js';
import { getProduct, clearErrors } from '../../actions/productAction.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.js';
import { toast } from "react-toastify";
import logoHead from "../../images/logoHead.png"

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        // Dispatch the action to fetch products
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-center" }); 
            dispatch(clearErrors()); 
        }
    }, [error, dispatch]);

    return (
        <>
            {loading ? (
                <Loader /> // Loader while fetching data
            ) : (
                <>
                    <section id="logoHead">
                        <div className="headlogo">
                            <div className="logo">
                                <img src={logoHead} style={{ maxWidth: "600px", height: "auto" }} alt="" />
                            </div>
                        </div>
                    </section>
                    <MetaData title="Dead Stock Marketplace" />
                    <div className="divCont">
                        <h2 className="homeHeading">
                            Featured Products
                        </h2>
                        <hr className="horizontal-rule" />  {/* Horizontal Rule */}

                        <div className="containere" id="containere">
                            {products && products.map((product) => (
                                <Product key={product._id} product={product} /> // Ensure unique key prop
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
