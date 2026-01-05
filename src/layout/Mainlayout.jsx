import React from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
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
