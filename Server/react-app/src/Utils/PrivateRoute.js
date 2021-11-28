import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './Common';

// handle the private routes
const PrivateRoute = ({component : Component}) => {
  const auth = getToken();
  return auth ? <Component/> : <Navigate to="/" />;
}

export default PrivateRoute;