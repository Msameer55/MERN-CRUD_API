import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
