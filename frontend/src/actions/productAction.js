import axios from "axios"
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS } from "../constants/productConstant"
import {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstant"
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS } from "../constants/productConstant";
import { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstant";
import { ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS } from "../constants/productConstant";

export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await axios.get("/api/v1/products"); // Get all products

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};


export const getAdminProduct = ()=> async(dispatch)=>{
    try {
        dispatch({type: ADMIN_PRODUCT_REQUEST})
        const {data} = await axios.get("/api/v1/admin/products")

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getProductDetailsAndUserData = (id, userId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // Making both API calls
    const productDetailsRequest = axios.get(`/api/v1/product/${id}`);
    const userApiRequest = axios.post(`http://localhost:8080/${id}`, { userId }, {
      headers: { "Content-Type": "application/json" }
    });

    // Use axios.all() to call both APIs simultaneously
    const [productDetails, userApiResponse] = await axios.all([productDetailsRequest, userApiRequest]);

    // Dispatch success action with product data
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: productDetails.data.product
    });

    // You can handle the response from the user API here if needed
    console.log("User API Response:", userApiResponse.data);

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

export const newReview = (reviewData)=> async(dispatch)=>{
    try {
        dispatch({type: NEW_REVIEW_REQUEST})

        const config = {
            headers:{"Content-Type":"application/json"}
        }

        const {data} = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
            dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const updateProduct = (id, productData)=> async(dispatch)=>{
    try {
        dispatch({type: UPDATE_PRODUCT_REQUEST})

        const config = {
            headers:{"Content-Type":"multipart/form-data"}
        }

        const {data} = await axios.put(`/api/v1/admin/product/${id}`,productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}


export const deleteProduct = (id)=> async(dispatch)=>{
    try {
        dispatch({type: DELETE_PRODUCT_REQUEST})

        const {data} = await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}


export const getAllReviews = (id)=> async(dispatch)=>{
    try {
        dispatch({type: ALL_REVIEW_REQUEST})

        const {data} = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type:ALL_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}


export const deleteReviews = (reviewId, productId)=> async(dispatch)=>{
    try {
        dispatch({type: DELETE_REVIEW_REQUEST})

        const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

//Clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}
