import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { Toaster } from 'react-hot-toast';
import './style/global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FirstPage from './pages/FirstPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
