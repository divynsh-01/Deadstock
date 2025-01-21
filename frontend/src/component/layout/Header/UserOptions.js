import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    { icon: <ShoppingCartIcon />, name: `Cart (${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user.role === 'admin') {
    options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard });
  }

  function dashboard() {
    navigate('/admin/dashboard');
  }

  function orders() {
    navigate('/orders');
  }

  function account() {
    navigate('/accounts');
  }

  function cart() {
    navigate('/cart');
  }

  function logoutUser() {
    dispatch(logout());
    toast.success('Logged out successfully!', { position: 'bottom-center' });
  }

  return (
    <>
      <Backdrop open={open} />

      <div className="speedDialWrapper" onMouseLeave={() => setOpen(false)}>
        <SpeedDial
          ariaLabel="User Options"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          icon={
            <div style={{ padding: '4px', borderRadius: '50%', overflow: 'hidden' }}>
              <img
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : '/logo192.png'}
                alt="Profile"
              />
            </div>
          }
          direction="down"
        >
          {options.map((option, index) => (
            <SpeedDialAction
              key={index}
              icon={option.icon}
              tooltipTitle={option.name}
              onClick={() => {
                setOpen(false); // Close SpeedDial after clicking
                option.func();
              }}
            />
          ))}
        </SpeedDial>
      </div>
    </>
  );
};

export default UserOptions;
