import axios from "axios";
import { My_ORDERS_FAIL, My_ORDERS_REQUEST, My_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstant";
import { CREATE_ORDER_FAIL, CLEAR_ERRORS, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS } from "../constants/orderConstant";
import { UPDATE_ORDERS_FAIL, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS, DELETE_ORDERS_FAIL, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS } from "../constants/orderConstant";
import { REMOVE_CART_ITEM } from "../constants/cartConstant";

// Create order
export const createOrder = (order) => async (dispatch) =>{
    try {
        dispatch({type: CREATE_ORDER_REQUEST})

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post("/api/v1/order/new",order,config)
        dispatch({type: CREATE_ORDER_SUCCESS, payload: data})

        // Clear the cart after successful order creation
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: [] // clearing cart items
        });

        localStorage.removeItem("cartItems"); // Remove from localStorage

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
        
    }
}

// My orders
export const myOrders = () => async (dispatch) =>{
    try {
        dispatch({type: My_ORDERS_REQUEST})

        const {data} = await axios.get("/api/v1/orders/me",)
        dispatch({type: My_ORDERS_SUCCESS, payload: data.orders})

    } catch (error) {
        dispatch({
            type: My_ORDERS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) =>{
    try {
        dispatch({type: ALL_ORDERS_REQUEST})

        const {data} = await axios.get("/api/v1/admin/orders",)
        dispatch({type: ALL_ORDERS_SUCCESS, payload: data.orders})

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

// Update Order (admin)
export const updateOrder = (id, order) => async (dispatch) =>{
    try {
        dispatch({type: UPDATE_ORDERS_REQUEST})

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.put(`/api/v1/admin/order/${id}`,order,config)
        dispatch({type: UPDATE_ORDERS_SUCCESS, payload: data.success})

    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

// Delete Order (admin)
export const deleteOrder = (id) => async (dispatch) =>{
    try {
        dispatch({type: DELETE_ORDERS_REQUEST})

        const {data} = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch({type: DELETE_ORDERS_SUCCESS, payload: data.success})

    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/v1/order/${id}`,)
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.order})

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//Clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}