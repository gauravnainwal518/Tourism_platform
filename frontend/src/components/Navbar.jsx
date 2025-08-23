import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses = () =>
    `px-4 py-2 rounded-full font-semibold transition text-gray-800 hover:bg-green-100`;

  return (
    <nav
      className={`fixed w-full z-20 top-0 left-0 transition-all bg-white shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Uttarakhand Tourism"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-green-800">
              Uttarakhand Tourism
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={navLinkClasses()}>
              Home
            </Link>
            <Link to="/about" className={navLinkClasses()}>
              About
            </Link>
            <Link to="/guides" className={navLinkClasses()}>
              Guide List
            </Link>
            <Link to="/homestays-public" className={navLinkClasses()}>
              Homestay List
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold hover:bg-green-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/admin/login"
                  className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition"
                >
                  Admin Login
                </Link>
              </>
            ) : (
              <>
                {role === "user" && (
                  <Link
                    to="/dashboard/user"
                    className="px-4 py-2 rounded-full bg-green-200 text-green-800 font-semibold hover:bg-green-300 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {role === "admin" && (
                  <Link
                    to="/dashboard/admin"
                    className="px-4 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold hover:bg-blue-300 transition"
                  >
                    Admin Panel
                  </Link>
                )}
                {role === "guide" && (
                  <Link
                    to="/dashboard/guide"
                    className="px-4 py-2 rounded-full bg-yellow-200 text-yellow-800 font-semibold hover:bg-yellow-300 transition"
                  >
                    Guide Panel
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-800 text-2xl font-bold"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-white shadow-md">
          <Link
            to="/"
            className="block text-gray-800 hover:bg-green-100 px-3 py-2 rounded"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-gray-800 hover:bg-green-100 px-3 py-2 rounded"
          >
            About
          </Link>
          <Link
            to="/guides"
            className="block text-gray-800 hover:bg-green-100 px-3 py-2 rounded"
          >
            Guide List
          </Link>
          <Link
            to="/homestays-public"
            className="block text-gray-800 hover:bg-green-100 px-3 py-2 rounded"
          >
            Homestay List
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 rounded bg-green-100 text-green-800 font-semibold hover:bg-green-200 transition"
              >
                Login
              </Link>
              <Link
                to="/admin/login"
                className="block px-4 py-2 rounded bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition"
              >
                Admin Login
              </Link>
            </>
          ) : (
            <>
              {role === "user" && (
                <Link
                  to="/dashboard/user"
                  className="block px-4 py-2 rounded bg-green-200 text-green-800 font-semibold hover:bg-green-300 transition"
                >
                  Dashboard
                </Link>
              )}
              {role === "admin" && (
                <Link
                  to="/dashboard/admin"
                  className="block px-4 py-2 rounded bg-blue-200 text-blue-800 font-semibold hover:bg-blue-300 transition"
                >
                  Admin Panel
                </Link>
              )}
              {role === "guide" && (
                <Link
                  to="/dashboard/guide"
                  className="block px-4 py-2 rounded bg-yellow-200 text-yellow-800 font-semibold hover:bg-yellow-300 transition"
                >
                  Guide Panel
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
