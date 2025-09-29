import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from '../Component/Home/Home'
import RestaurantDetails from '../Component/Restaurant/RestaurantDetails'
import Cart from '../Component/Cart/Cart'
import Profile from '../Component/Profile/Profile'
import Auth from '../Auth/Auth'
import PaymentSuccess from '../Component/PaymentSuccess/PaymentSuccess'

const CustomerRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/*" element={<Auth />} />
        <Route path="/restaurant/:city/:title/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
};

export default CustomerRoute