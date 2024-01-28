import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
