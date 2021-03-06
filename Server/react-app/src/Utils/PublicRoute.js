import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
const PublicRoute = ({component : Component}) => {
  const auth = getToken(); 
  return auth ? <Navigate to="/home" /> : <Component />;
}

export default PublicRoute;