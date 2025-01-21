import React, { useEffect } from 'react';
import "./MyOrders.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData';
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user.name}'s Orders -- DeadStock`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <div className="ordersTableContainer">
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            <div className="tableWrapper">
              <table className="customOrdersTable">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Items Qty</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td className={row.status === "Delivered" ? "greenColor" : "redColor"}>
                        {row.status}
                      </td>
                      <td>{row.itemsQty}</td>
                      <td>{row.amount}</td>
                      <td>
                        <Link to={`/order/${row.id}`}>
                          <LaunchIcon />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
