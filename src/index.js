import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";
import UsersContextProvider from './contexts/ProductContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UsersContextProvider>
      <CartProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </CartProvider>
    </UsersContextProvider>
  </Router>
);
