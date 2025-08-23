import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-700 to-blue-500 text-white px-4">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Oops! Page not found.
      </h2>
      <p className="mb-8 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-md hover:bg-green-100 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
