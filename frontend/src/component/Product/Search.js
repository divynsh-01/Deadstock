import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Use dispatch from redux
import { getProduct } from "../../actions/productAction"; // Import the action
import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = () => {
    const [keyword, setKeyword] = useState(""); // State for keyword input
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products for dropdown
    const [showDropdown, setShowDropdown] = useState(false); // To toggle dropdown visibility
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Use dispatch to call actions
    
    // Fetch products from Redux state
    const { loading, error, products } = useSelector(state => state.products);

    // Dispatch action to get products on load
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => {
        if (keyword.trim()) {
            // Filter products for dropdown based on keyword
            const filtered = products
                .map(product => product.name) // Extract only product names
                .filter(name => name.toLowerCase().includes(keyword.toLowerCase()));
            
            setFilteredProducts(filtered);
            setShowDropdown(filtered.length > 0); // Show dropdown if filtered products exist
        } else {
            setFilteredProducts([]);
            setShowDropdown(false);
        }
    }, [keyword, products]); // Runs on keyword change or products change

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            // Filter products based on keyword search
            const filteredProductObjects = products.filter(product => 
                product.name.toLowerCase().includes(keyword.toLowerCase())
            );

            // If no products match, redirect to NoProduct.js
            if (filteredProductObjects.length === 0) {
                navigate("/no-products");  // Redirect to NoProduct.js
            } else {
                // Redirect to Products.js or display matching products
                navigate(`/products/${keyword}`);
            }
        } else {
            navigate(`/products`); // If no keyword, show all products
        }
    };

    const handleProductClick = (productName) => {
        setKeyword(productName);
        navigate(`/products/${productName}`);
        setShowDropdown(false);
    };

    return (
        <>
            <MetaData title="Search a product -- DeadStock" />
            <div className="cntn">
                <form className="searchBox" onSubmit={searchSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Search a product"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <input type="submit" value="Search" />
                </form>

                {loading && <div>Loading...</div>} {/* Show loading indicator */}
                {error && <div>{error}</div>} {/* Show error message */}

                {/* Dropdown for search suggestions */}
                {showDropdown && filteredProducts.length > 0 && (
                    <ul className="dropdownn">
                        {filteredProducts.map((product, index) => (
                            <li key={index} onClick={() => handleProductClick(product)}>
                                {product}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Search;
