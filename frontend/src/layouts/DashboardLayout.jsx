import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getToken } from "../utils/token";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <Header setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarOpen} // pass the toggle state
          setCollapsed={setSidebarOpen} // toggle function
          userRole={userRole}
        />

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
