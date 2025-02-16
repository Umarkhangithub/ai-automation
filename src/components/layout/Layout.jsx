import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-[100vh] relative top-0  ">
        <div className="max-w-full mx-auto  mt-10 ">
        {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;