import React from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Forgot from "./pages/Forgot";
import MyAccount from "./pages/MyAccount";
import './App.css'

const App = () => {
  return (
    <div className="overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" Component={Signup}></Route>
          <Route path="/ResetPassword/:token" Component={ResetPassword}></Route>
          <Route path="/forgot" Component={Forgot}></Route>
          <Route path="/settings" Component={MyAccount}></Route>
        </Routes>
        <Sidebar />
        <Footer />
    </div>
  );
};

export default App;
