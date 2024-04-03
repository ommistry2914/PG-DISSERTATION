import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { authenticated, userRole } = useAuth();

  return authenticated && userRole === 'guide' ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
