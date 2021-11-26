import React from 'react';
import { Route, Navigate, BrowserRouter } from 'react-router-dom';
import { getToken } from './Common';

// handle the private routes
const PrivateRoute = ({component : Component}) => {
  const auth = getToken();
  return auth ? <Component/> : <Navigate to="/login" />;
}

export default PrivateRoute;