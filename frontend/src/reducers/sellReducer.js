import { NEW_SELL_PRODUCT_FAIL, NEW_SELL_PRODUCT_REQUEST, NEW_SELL_PRODUCT_RESET, NEW_SELL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../constants/sellConstant";

export const newSellProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_SELL_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case NEW_SELL_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            };
        case NEW_SELL_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case NEW_SELL_PRODUCT_RESET:
            return {
                ...state,
                success: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
