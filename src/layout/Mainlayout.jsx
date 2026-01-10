import React from "react";
import Nav from "../component/Nav.jsx";
import Footer from "../component/Footer.jsx";
import { Outlet, Route, Routes } from "react-router-dom";

const Mainlayout = () => {
  return (
    <>
      <Nav></Nav>

      <div>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Mainlayout;
