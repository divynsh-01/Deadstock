import {combineReducers, applyMiddleware} from "redux"
import { legacy_createStore as createStore } from 'redux';


import {thunk} from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension"
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import {allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer}  from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user: userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    allOrders: allOrdersReducer,
    order: ordersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    reviews: reviewReducer
})

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {}
    }
}

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store;