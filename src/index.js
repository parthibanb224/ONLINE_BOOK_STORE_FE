import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import UsersContextProvider from './contexts/ProductContext';
import CartContextProvider from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UsersContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UsersContextProvider>
  </Router>
);
