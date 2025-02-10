import {
    TRACK_PRODUCT_CLICK_REQUEST,
    TRACK_PRODUCT_CLICK_SUCCESS,
    TRACK_PRODUCT_CLICK_FAIL
} from "../constants/clickConstant";

export const productClickReducer = (state = {}, action) => {
    switch (action.type) {
        case TRACK_PRODUCT_CLICK_REQUEST:
            return {
                loading: true,
            };
        case TRACK_PRODUCT_CLICK_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message,
            };
        case TRACK_PRODUCT_CLICK_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
