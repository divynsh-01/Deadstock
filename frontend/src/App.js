import React, { useState, useEffect } from 'react';
// ...other imports...

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true);  // Added loading state

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    setLoading(false);  // Set loading to false after fetching the stripe key
  }

  useEffect(() => {
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

        {/* Show NotFound only after loading is complete */}
        <Route path="*" element={loading ? <div>Loading...</div> : <NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
