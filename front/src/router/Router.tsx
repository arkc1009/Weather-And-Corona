import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import FirstPage from '../pages/FirstPage';
import ErrorPage from '../pages/ErrorPage';
import MainRouter from './MainRouter';
import Header from '../components/organisms/header/Header';
import { CoronaProvider } from '../hooks/useCorona';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <CoronaProvider>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main/*" element={<MainRouter />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CoronaProvider>
    </BrowserRouter>
  );
};

export default Router;
