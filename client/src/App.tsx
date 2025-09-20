import React, { useState } from 'react'
import type {ReactNode} from 'react'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route, Navigate } from "react-router";
import './App.css'

import Home from './Home/Home';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

//Only show Dashboard if user is logged in, else redirect to login page

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
  const isAuthenticated = false;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
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
