// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MetaMaskProvider } from './context/MetaMaskContext'; // ✅ Import MetaMaskProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);

reportWebVitals();
