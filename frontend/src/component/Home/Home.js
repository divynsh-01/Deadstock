import React, { useEffect, useState } from "react";
import "./Home.css"; // Import the CSS file
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import { getProduct, clearErrors } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { toast } from "react-toastify";
import logoHead from "../../images/logoHead2.png";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8

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

  // Pagination Logic
  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      {loading ? (
        <Loader /> // Loader while fetching data
      ) : (
        <>
          <section id="logoHead">
            <div className="headlogo">
              <img src={logoHead} style={{ width: "90%", height: "auto" }} alt="" />
            </div>
          </section>
          <MetaData title="Dead Stock Marketplace" />
          <div className="mainCont">
            <div className="divCont">
              <h2 className="homeHeading">Featured Products</h2>
              <hr className="horizontal-rule" /> {/* Horizontal Rule */}
              <div className="containere" id="containere">
                {currentProducts && currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <Product key={product._id} product={product} /> // Ensure unique key prop
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1} className="pnBtn"
                  >
                    Prev
                  </button>
                  <span> Page {currentPage} of {totalPages} </span>
                  <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages} className="pnBtn"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default Home;
