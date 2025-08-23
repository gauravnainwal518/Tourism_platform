import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-green-800">
            Uttarakhand Tourism
          </h2>
          <p className="text-gray-600 text-sm">
            Discover the natural beauty, spiritual heritage, and adventure of
            Uttarakhand with our trusted platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-700">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-700 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Contact</h3>
          <p className="text-gray-600 text-sm">Tourism Office, Uttarakhand</p>
          <p className="text-gray-600 text-sm">Phone: +91 12345 67890</p>
          <p className="text-gray-600 text-sm">
            Email: info@uttarakhandtourism.in
          </p>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-200 pt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Uttarakhand Tourism Platform. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
