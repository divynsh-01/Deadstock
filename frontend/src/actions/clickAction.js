import axios from "axios";
import {
    TRACK_PRODUCT_CLICK_REQUEST,
    TRACK_PRODUCT_CLICK_SUCCESS,
    TRACK_PRODUCT_CLICK_FAIL
} from "../constants/clickConstant";

// Action to track product click
export const trackProductClick = (productId, userId) => async (dispatch) => {
    try {
        dispatch({ type: TRACK_PRODUCT_CLICK_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        // Send POST request to backend
        const { data } = await axios.post(
            `https://deadboot-production.up.railway.app/sugg/id/${productId}`,  // Ensure correct URL structure
            { userId },  // Send userId in the request body
            config
        );

        // Dispatch success action with received data
        dispatch({
            type: TRACK_PRODUCT_CLICK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch failure action if error occurs
        dispatch({
            type: TRACK_PRODUCT_CLICK_FAIL,
            payload: error.response?.data.message || "Something went wrong",
        });
    }
};
