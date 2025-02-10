import axios from "axios";
import { NEW_SELL_PRODUCT_FAIL, NEW_SELL_PRODUCT_REQUEST, CLEAR_ERRORS, NEW_SELL_PRODUCT_SUCCESS } from "../constants/sellConstant";

export const createSellProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SELL_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        const { data } = await axios.post(`/api/v1/sellproduct`, productData, config);

        dispatch({
            type: NEW_SELL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NEW_SELL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
