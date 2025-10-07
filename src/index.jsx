// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css'; // 👈 Tailwind 포함
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);