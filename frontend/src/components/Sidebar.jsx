import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Sidebar = ({ userRole, collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Role-based dashboard root path
  const dashboardPath =
    userRole === "admin"
      ? "/dashboard/admin"
      : userRole === "guide"
      ? "/dashboard/guide"
      : userRole === "owner"
      ? "/dashboard/owner"
      : "/dashboard/user";

  const menuItems = [
    { name: "Dashboard", path: dashboardPath, icon: HomeIcon },

    ...(userRole === "admin"
      ? [
          {
            name: "Guide Applications",
            path: "/dashboard/admin/guide-applications",
            icon: UserGroupIcon,
          },
          {
            name: "Homestay Applications",
            path: "/dashboard/admin/homestay-applications",
            icon: ClipboardIcon,
          },
        ]
      : []),

    ...(userRole === "guide"
      ? [
          {
            name: "My Bookings",
            path: "/dashboard/guide/bookings",
            icon: ClipboardIcon,
          },
        ]
      : []),

    ...(userRole === "owner"
      ? [
          {
            name: "My Homestay Bookings",
            path: "/dashboard/owner/bookings",
            icon: BuildingOfficeIcon,
          },
          {
            name: "Register Homestay",
            path: "/dashboard/owner/register-homestay",
            icon: PlusCircleIcon,
          },
        ]
      : []),

    ...(userRole === "user"
      ? [
          {
            name: "Book a Guide",
            path: "/dashboard/user/book-guide",
            icon: ClipboardIcon,
          },
          {
            name: "Book a Homestay",
            path: "/dashboard/user/book-homestay",
            icon: ClipboardIcon,
          },
          {
            name: "Register Homestay",
            path: "/dashboard/user/register-homestay",
            icon: PlusCircleIcon,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Overlay for small screens */}
      {collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-green-900 text-white z-30 transform transition-transform duration-300
          ${
            collapsed ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:w-64`}
      >
        {/* Header / Title */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-green-800">
          <span className="font-bold text-xl md:block hidden">
            Uttarakhand Tours
          </span>
          <button
            onClick={() => setCollapsed(false)}
            className="md:hidden p-1 rounded-md hover:bg-green-700"
          >
            ✕
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-2 py-6 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-green-700 ${
                  isActive ? "bg-green-700 shadow-lg" : ""
                }`
              }
              onClick={() => setCollapsed(false)} // close on mobile after click
            >
              <item.icon className="w-6 h-6" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="px-2 py-4 border-t border-green-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
