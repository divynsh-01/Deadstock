import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './OrderSuccess.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeItemsFromCart } from '../../actions/cartAction'; // Import the clear cart action

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear the cart on success and navigate to the orders page after a short delay
  useEffect(() => {
    dispatch(removeItemsFromCart([])); // Clear cart when order is successful
    localStorage.removeItem("cartItems"); // Ensure localStorage is updated

    // Redirect to orders page after 3 seconds
    setTimeout(() => {
      navigate("/orders"); // Redirect to the orders page
    }, 3000);
  }, [dispatch, navigate]);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order Has Been Placed Successfully</Typography>
      <Typography>Redirecting to your orders...</Typography>
    </div>
  );
};

export default OrderSuccess; // Default export
