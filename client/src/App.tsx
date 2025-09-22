import React, { useState } from 'react'
import type {ReactNode} from 'react'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route, Navigate } from "react-router";
import './App.css'

import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Login/Signup';
import BuyerDashboard from './Dashboard/BuyerDashboard';
import SellerDashboard from './Dashboard/SellerDashboard';

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
      <Route 
        path="/seller-dashboard" 
        element={
          <ProtectedRoute>
            <SellerDashboard/>
          </ProtectedRoute>}
      />
    </>
  )
)

const App:React.FC = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
