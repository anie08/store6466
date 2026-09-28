import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/component/header/Header.jsx";


const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

    </>
  );
};

export default Layout;
