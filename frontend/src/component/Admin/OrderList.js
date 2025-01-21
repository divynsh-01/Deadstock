import React, { Fragment, useEffect } from "react";
import "./OrderList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    deleteOrder,
    getAllOrders,
    clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstant";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const OrderList = ({ history }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDERS_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, navigate, isDeleted]);

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <table className="orderTable">
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
                            {orders &&
                                orders.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td className={
                                            item.orderStatus === "Delivered" ? "greenColor" : "redColor"
                                        }>
                                            {item.orderStatus}
                                        </td>
                                        <td>{item.orderItems.length}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>
                                            <Link to={`/admin/order/${item._id}`}>
                                                <EditIcon />
                                            </Link>
                                            <Button
                                                onClick={() => deleteOrderHandler(item._id)}
                                                className="deleteButton"
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;
