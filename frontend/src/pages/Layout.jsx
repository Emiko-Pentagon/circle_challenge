import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from "react-hot-toast";


 const Layout = () => {
  return (
    <div className="bg-[#0b0b1a] text-gray-200 min-h-screen font-sans antialiased">
      <Navbar />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
          style: {
            background: "#0f0f1f",
            border: "1px solid #3a3a5a",
            color: "#fff",
          },
        }}
      />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};


export default Layout;