import React, { useEffect } from 'react';
import SideBar from "./SideBar.js";
import "./dashboard.css";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Import ArcElement for Doughnut chart
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';



// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement 
);

const DashBoard = () => {

    const dispatch = useDispatch()

    const { users } = useSelector((state) => state.allUsers);
    const {products} = useSelector((state)=>state.products)
    const {orders} = useSelector((state)=>state.allOrders)

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }, [dispatch]);

    let totalAmount = 0;

    orders && orders.forEach(item=>{
        totalAmount+=item.totalPrice
    })

    let outOfStock = 0;

    products && products.forEach((item)=>{
        if(item.Stock === 0){
            outOfStock += 1
        }
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["blue"],
                hoverBackgroundColor: ["red"],
                data: [0, totalAmount],
            }
        ]
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#9db1ea", "#e47e98"],
                hoverBackgroundColor: ["#7c98e8", "#e26182"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    };

    return (
        <div className="dashboard">
            <SideBar />
            <div className="dashboardContainer">
                <Typography component='h1'>Dashboard</Typography>
                <div className="dashboardSummary">
                    <div className='totalAmount'>
                        <p>Total amount <br /> ₹{totalAmount}</p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to='/admin/products'>
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>

                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>

                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line
                        data={lineState}
                    />
                </div>

                <div className="donughChart">
                    <Doughnut
                        data={doughnutState}
                    />
                </div>

            </div>
        </div>
    );
}

export default DashBoard;
