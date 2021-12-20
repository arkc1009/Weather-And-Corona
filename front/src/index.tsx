import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { Toaster } from 'react-hot-toast';
import './style/global.css';
import Router from './router/Router';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Router />

    <Toaster />
  </React.StrictMode>,
  document.getElementById('root'),
);
