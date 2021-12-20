import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../api/LoginManage';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return isLogin() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
