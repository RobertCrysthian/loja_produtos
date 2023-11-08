import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {MenuProvider } from './context/menuButton';
import CardItens, { CardProvider } from './context/cardItens';
import { CpfProvider } from './context/cpfs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MenuProvider>
    <CardProvider>
    <CpfProvider>
      <App />
    </CpfProvider>
    </CardProvider>
    </MenuProvider>

  </React.StrictMode>
);

