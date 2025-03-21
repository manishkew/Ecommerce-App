import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {BrowserRouter}from 'react-router-dom'
import Footer from './components/Footer';
import { AuthProvider } from './components/context/auth';
import 'antd/dist/reset.css'
import { SearchProvider } from './components/context/search';
import { CartProvider } from './components/context/cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
  <SearchProvider>
  <AuthProvider>     
  <BrowserRouter>
 {/* <React.StrictMode> */} 
    <App />
    <Footer/>
  {/* </React.StrictMode> */}
  </BrowserRouter>
  </AuthProvider>
  </SearchProvider>
  </CartProvider>
);
reportWebVitals();
