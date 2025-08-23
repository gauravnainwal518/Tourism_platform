import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Header = ({ setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const firstName = user?.name
    ? user.name.split(" ")[0]
    : user?.fullName
    ? user.fullName.split(" ")[0]
    : "Guest";

  // Only guide gets menu links dynamically
  const getMenuLinks = (role, userId) => {
    if (role === "guide" && userId) {
      return [
        { label: "View Profile", path: `/guides/${userId}` },
        { label: "Edit Profile", path: `/guides/${userId}/edit` },
      ];
    }
    return []; // Other roles(owner ,user, admin) have no dropdown
  };

  const menuLinks = getMenuLinks(user?.role, user?.id || user?._id);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-green-700 text-white shadow-md flex items-center justify-between px-4 md:px-6 py-4">
      {/* Left: Sidebar toggle + Welcome text */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle for mobile */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md hover:bg-green-600 transition-colors duration-200 md:hidden"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        {/* Welcome message */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide truncate">
          Welcome, {firstName}
          {user?.role === "admin" ? " (Admin)" : ""}
        </h1>
      </div>

      {/* Right: Notifications + User menu */}
      <div className="flex items-center gap-3 relative">
        <BellIcon className="w-6 h-6 cursor-pointer hover:text-yellow-200 transition-colors duration-200" />

        <div
          className="flex items-center gap-2 cursor-pointer hover:text-yellow-200 transition-colors duration-200 relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <UserCircleIcon className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 text-green-700" />
          <span className="hidden md:inline truncate">
            {user?.name || user?.fullName || "Guest"}
          </span>

          {menuOpen && menuLinks.length > 0 && (
            <div className="absolute right-0 mt-12 w-44 bg-white text-gray-900 rounded shadow-lg z-50">
              {menuLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
