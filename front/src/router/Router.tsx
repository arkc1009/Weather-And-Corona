import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import FirstPage from '../pages/FirstPage';
import ErrorPage from '../pages/ErrorPage';
import MainRouter from './MainRouter';
import Header from '../components/organisms/header/Header';
import { CoronaProvider } from '../hooks/useCorona';
import PrivateRoute from '../route/PrivateRoute';
import PublicRoute from '../route/PublicRoute';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <CoronaProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <FirstPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/main/*"
            element={
              <PrivateRoute>
                <MainRouter />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CoronaProvider>
    </BrowserRouter>
  );
};

export default Router;
