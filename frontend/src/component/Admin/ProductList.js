import React, { useEffect } from "react";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, deleteProduct, getAdminProduct } from "../../actions/productAction";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { error, products = [] } = useSelector((state) => state.products);
  const{error: deleteError, isDeleted} = useSelector((state)=>state.products)

  const deleteProductHandler = (id)=>{
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      toast.error(deleteError)
      dispatch(clearErrors())
    }

    if(isDeleted){
      toast.success("Product Deleted Successfully")
      navigate("/admin/dashboard")
      dispatch({type: DELETE_PRODUCT_RESET})
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);


  return (
    <>
      <MetaData title={`All Products - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <div className="tableContainer">
            <table className="customTable">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.Stock}</td>
                    <td>{product.price}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}`}>
                        <EditIcon style={{ cursor: "pointer", marginRight: "8px" }} />
                      </Link>
                      <button
                        className="deleteButton"
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
