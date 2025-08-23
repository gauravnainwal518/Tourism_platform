import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-white dark:text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow mt-16">
        {/* mt-16 for fixed navbar spacing */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
