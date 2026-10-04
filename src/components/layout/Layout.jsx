import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/component/header/Header.jsx";
import Footer from "./component/footer/Footer.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
