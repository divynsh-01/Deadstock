import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Contact from './component/Contact/Contact.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp.js';
import AboutUs from './component/About/AboutUs.js';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js"
import DashBoard from "./component/Admin/DashBoard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import OrderList from './component/Admin/OrderList.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import NotFound from './component/NotFound/NotFound.js'; 

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          path="/accounts"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
        <Route path="/shipping" element={<ProtectedRoute component={Shipping} />} />
        <Route path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
        <Route path="/success" element={<ProtectedRoute component={OrderSuccess} />} />
        <Route path="/orders" element={<ProtectedRoute component={MyOrders} />} />
        <Route path="/order/:id" element={<ProtectedRoute component={OrderDetails} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} component={DashBoard} />} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} component={ProductList} />} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} component={NewProduct} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />} />
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} component={OrderList} />} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} component={UsersList} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} component={UpdateUser} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} component={ProductReviews} />} />

        {isAuthenticated && stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute component={Payment} />
              </Elements>
            }
          />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
