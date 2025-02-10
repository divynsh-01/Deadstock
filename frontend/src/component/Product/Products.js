import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import Product from '../Home/Product';
import { toast } from "react-toastify";
import MetaData from '../layout/MetaData';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import "./Products.css";
import logoHead from "../../images/logoHead2.png"

const categories = [
    "Laptop", "Footwear", "Bottom", "Attire", "Smartphones",
    "Accessories", "Technology", "Sports", "Electronics",
    "Decor", "Art", "Toys"
];

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const priceRef = useRef([0, 100000]);
    const debounceTimeout = useRef(null);

    const productsPerPage = 8;

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-center" });
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const priceHandler = (event, newPrice) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        priceRef.current = newPrice;
        debounceTimeout.current = setTimeout(() => {
            dispatch(getProduct(null, currentPage, priceRef.current, category, ratings));
        }, 500);
    };

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
        dispatch(getProduct(null, currentPage, priceRef.current, selectedCategory, ratings));
    };

    const filteredProducts = products?.filter(product =>
        product.isVerified &&
        product.price >= priceRef.current[0] &&
        product.price <= priceRef.current[1] &&
        (!category || product.category === category) &&
        product.ratings >= ratings
    ) || [];

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Products -- DeadStock" />
                    <section id="logoHead">
                        <div className="headlogo">
                            <img src={logoHead} style={{ width: "90%", height: "auto" }} alt="" />
                        </div>
                    </section>
                    <h2 className="ProductsHeading">Products</h2>
                    <hr className="horizontal-rule" />

                    {/* Filter Button and Dropdown */}
                    <div className="dropdown"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className="dropbtn">Filter</button>
                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <div className="filterBox">
                                    <Typography>Price</Typography>
                                    <Slider
                                        defaultValue={priceRef.current}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={100000}
                                    />
                                    <Typography>Categories</Typography>
                                    <ul className="categoryBox">
                                        {categories.map((categoryItem) => (
                                            <li
                                                className="category-link"
                                                key={categoryItem}
                                                onClick={() => handleCategoryClick(categoryItem)}
                                            >
                                                {categoryItem}
                                            </li>
                                        ))}
                                    </ul>
                                    <fieldset>
                                        <Typography component="legend">Ratings Above</Typography>
                                        <Slider
                                            value={ratings}
                                            onChange={(e, newRating) => setRatings(newRating)}
                                            min={0}
                                            max={5}
                                            valueLabelDisplay="auto"
                                        />
                                    </fieldset>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Products Display */}
                    <div className="products">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        ) : (
                            <p>No verified products available</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1} className='pnBtn'
                            >
                                Prev
                            </button>
                            <span> Page {currentPage} of {totalPages} </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages} className='pnBtn'
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Products;
