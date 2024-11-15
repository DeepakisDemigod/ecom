import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';
import LoginSignup from './components/user/LoginSignup.jsx';
import UpdateProfile from './components/user/UpdateProfile.jsx';
import UpdatePassword from './components/user/UpdatePassword.jsx';
import ForgotPassword from './components/user/ForgotPassword.jsx';
import ResetPassword from './components/user/ResetPassword.jsx';
import Profile from './components/user/Profile.jsx';
import NotFound from './components/layout/NotFound.jsx';
import ProtectedRoute from './components/Route/ProtectedRoute.jsx';
import UserOptions from './components/layout/Header/UserOptions.jsx';
import Cart from './components/cart/Cart.jsx';
import { loadUser } from './actions/userAction.js';
import store from './store.js';
import Shipping from './components/cart/Shipping.jsx';
import ConfirmOrder from './components/cart/ConfirmOrder.jsx';
import Payment from './components/cart/Payment.jsx';
import axios from 'axios';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/product/:id'
          element={<ProductDetails />}
        />
        <Route
          path='/products'
          element={<Products />}
        />
        <Route
          path='/products/:keyword'
          element={<Products />}
        />
        <Route
          path='/search'
          element={<Search />}
        />
        <Route
          path='/login'
          element={<LoginSignup />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path='/account'
            element={<Profile />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path='/me/update'
            element={<UpdateProfile />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path='/password/update'
            element={<UpdatePassword />}
          />
        </Route>
        <Route
          exact
          path='/password/forgot'
          element={<ForgotPassword />}
        />
        <Route
          exact
          path='/password/reset/:token'
          element={<ResetPassword />}
        />
        <Route
          exact
          path='/cart'
          element={<Cart />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path='/shipping'
            element={<Shipping />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path='/order/confirm'
            element={<ConfirmOrder />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path='/process/payment'
            element={<Payment />}
          />
        </Route>

        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
}

export default App;
