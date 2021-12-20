import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../api/LoginManage';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return !isLogin() ? children : <Navigate to="/main" />;
};

export default PublicRoute;
