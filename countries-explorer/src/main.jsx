import './index.css'
import React from 'react';
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);