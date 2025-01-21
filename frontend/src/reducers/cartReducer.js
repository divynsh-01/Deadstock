import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant";
export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            // Make sure cartItems is always an array
            const cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];

            const isItemExist = cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...cartItems, item]
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: Array.isArray(action.payload) ? action.payload : [] // Safeguard here
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            };

        default:
            return state;
    }
};
