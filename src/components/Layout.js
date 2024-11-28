import React from "react";
import Navbar from "./NavFoot/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./NavFoot/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
