import React, { useState } from 'react'
import type {ReactNode} from 'react'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route, Navigate } from "react-router";
import './App.css'

import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Login/Signup';

import BuyerDashboard from './Dashboard/Buyer/BuyerDashboard';
import BuyerMessage from './Dashboard/Buyer/BuyerMessage';
import BuyerOrders from './Dashboard/Buyer/BuyerOrders';
import Cart from './Dashboard/Buyer/Cart';
import Explore from './Dashboard/Buyer/Explore';
import Favorites from './Dashboard/Buyer/Favorites';

import SellerDashboard from './Dashboard/Seller/SellerDashboard';
import Earnings from './Dashboard/Seller/Earnings';
import Listings from './Dashboard/Seller/Listings';
import SellerMessage from './Dashboard/Seller/SellerMessage';
import SellerOrders from './Dashboard/Seller/SellerOrders';

import Profile from './Dashboard/Profile';

//Only show Dashboard if user is logged in, else redirect to login page

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route 
        path="/buyer-dashboard" 
        element={
          <ProtectedRoute>
            <BuyerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/buyer-dashboard/message" element={<BuyerMessage/>}/>
      <Route path="/buyer-dashboard/orders" element={<BuyerOrders />} />
      <Route path="/buyer-dashboard/cart" element={<Cart />} />
      <Route path="/buyer-dashboard/explore" element={<Explore />} />
      <Route path="/buyer-dashboard/favorites" element={<Favorites />} />

      <Route 
        path="/seller-dashboard" 
        element={
          <ProtectedRoute>
            <SellerDashboard/>
          </ProtectedRoute>}
      />
      <Route path="/seller-dashboard/earnings" element={<Earnings />} />
      <Route path="/seller-dashboard/listings" element={<Listings />} />
      <Route path="/seller-dashboard/message" element={<SellerMessage />} />
      <Route path="/seller-dashboard/orders" element={<SellerOrders />} />

      <Route path="/profile" element={<Profile />} />
    </>
  )
)

const App:React.FC = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
