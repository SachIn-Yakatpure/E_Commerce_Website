import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('auth-token');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/beauty" replace />;
  }

  // If token exists, render the component
  return children;
};

export default PrivateRoute;
