import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Search.css';
import MetaData from '../layout/MetaData';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate(); // Initialize navigate function

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`); // Use navigate for routing
        } else {
            navigate(`/products`);
        }
    };

    return (
        <>
            <MetaData title="Search a product -- DeadStock"/>
            <div className="cntn">
                <form className="searchBox" onSubmit={searchSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Search a product"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <input type="submit" value="Search" />
                </form>
            </div>
        
        </>
    );
};

export default Search;
