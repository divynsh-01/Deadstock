import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import Product from '../Home/Product';
import './Products.css';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { toast } from "react-toastify";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData';
import logoHead from "../../images/logoHead.png"


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphones"
];

const Products = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const debounceTimeout = useRef(null);
    const priceRef = useRef([0, 100000]); // Ref to hold the price range

    const [ratings, setRatings] = useState(0)

    const { keyword } = useParams();
    const dispatch = useDispatch();

    const { products, loading, error, productCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );

    const handleDropdownEnter = () => setIsDropdownOpen(true);
    const handleDropdownLeave = () => setIsDropdownOpen(false);

    const setCurrentPageNo = (e) => setCurrentPage(e);

    const priceHandler = (event, newPrice) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        priceRef.current = newPrice;

        debounceTimeout.current = setTimeout(() => {
            dispatch(getProduct(keyword, currentPage, priceRef.current, category, ratings));
        }, 500);
    };

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
        dispatch(getProduct(keyword, currentPage, priceRef.current, selectedCategory, ratings));
    };

    // Fetch products whenever filters change
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, priceRef.current, category, ratings));
    }, [dispatch, keyword, currentPage, category, ratings]);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-center" });
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    let count = filteredProductsCount;

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <section id="logoHead">
                        <div class="headlogo">
                            <div class="logo">
                                <img src={logoHead} style={{ maxWidth: "600px", height: "auto" }} alt="" />
                            </div>
                        </div>
                    </section>
                    <MetaData title="Products -- DeadStock" />
                    <div
                        className={`dropdown ${isDropdownOpen ? "open" : ""}`}
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button className="dropbtn">Filters</button>
                        <div className="dropdown-content">
                            <div className="filterBox">
                                <Typography>Price</Typography>
                                <div className="sliderWrapper">
                                    <Slider
                                        defaultValue={priceRef.current}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        min={0}
                                        max={100000}
                                    />
                                </div>
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
                                        onChange={(e, newRating) => {
                                            setRatings(newRating)
                                        }}
                                        aria-labelledby='continuous-slider'
                                        min={0}
                                        max={5}
                                        valueLabelDisplay='auto'
                                    />
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <h2 className="ProductsHeading">Products</h2>
                    <hr className="horizontal-rule" />
                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                    </div>
                    {/* Pagination */}
                    <div className="paginationBoxx">
                        {resultPerPage < count && (
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Products;
