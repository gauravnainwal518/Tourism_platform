import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-800 to-blue-600 text-white px-8 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo-here logo displays the text "tourist platform" */}
        <div className="text-3xl font-bold tracking-wide">
          <Link
            to="/"
            className="hover:text-blue-300 transition duration-300 ease-in-out"
          >
            Tourism Platform
          </Link>
        </div>

        {/*menu links*/}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-blue-300 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/guides"
              className="hover:text-blue-300 transition duration-300 ease-in-out"
            >
              Guides
            </Link>
          </li>
          <li>
            <Link
              to="/homestays"
              className="hover:text-blue-300 transition duration-300 ease-in-out"
            >
              Homestays
            </Link>
          </li>

          <li>
            <Link
              to="/experiences"
              className="hover:text-blue-300 transition duration-300 ease-in-out"
            >
              Experiences
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-blue-300 transition duration-300 ease-in-out"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button -enbale responsive design*/}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
