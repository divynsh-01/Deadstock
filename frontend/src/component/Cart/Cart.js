import React from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard.js';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction.js';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData.js';
import { toast } from 'react-toastify'; // Import react-toastify for notifications

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    // Ensure cartItems is always an array
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    const increaseQuantity = (id, quantity, stock) => {
        const newqty = quantity + 1;
        if (stock <= quantity) {
            return; // Don't allow quantity to exceed stock
        }
        dispatch(addItemsToCart(id, newqty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newqty = quantity - 1;
        if (1 >= quantity) {
            return; // Prevent quantity from going below 1
        }
        dispatch(addItemsToCart(id, newqty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    // New function to check stock and handle checkout
    const checkOutHandler = () => {
        // Check if any product in the cart exceeds the available stock
        const outOfStockItems = safeCartItems.filter(item => item.quantity > item.stock);

        if (outOfStockItems.length > 0) {
            // If out of stock items are found, display error messages
            outOfStockItems.forEach(item => {
                toast.error(`${item.name} is out of stock or the selected quantity exceeds available stock.`);
            });
        } else {
            // If all items are in stock, proceed with checkout
            navigate("/shipping");
        }
    };

    return (
        <>
            <MetaData title={"Cart -- DeadStock"} />
            {safeCartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>

                    <div className="mobileCartHeader">
                        <ShoppingCartIcon />
                        <p>Your Cart</p>
                    </div>

                    {safeCartItems.map((item) => (
                        <div className="cartContainer" key={item.product}>
                            <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                            <div className="cartInput">
                                <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                <input type="number" value={item.quantity} readOnly />
                                <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                            </div>
                            <div className="cartSubtotal">
                                {`$${item.price * item.quantity}`}
                            </div>
                        </div>
                    ))}
                    <div className="ctr">
                        <div className="cartGrossTotal">
                            <div></div>
                            <div className="cartGrossTotalBox">
                                <p>Gross Total : {`${safeCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkOutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
