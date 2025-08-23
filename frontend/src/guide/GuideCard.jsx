//future use not used yet.
import React from "react";
import { Link } from "react-router-dom";

const GuideCard = ({ guide }) => {
  if (!guide) return <p>Loading guide details...</p>;

  return (
    <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md w-80 border border-gray-200 mb-6">
      {/* Name first */}
      <h2 className="text-xl font-bold mb-2">
        {guide.fullName || guide.name || "-"}
      </h2>

      {/* Email next */}
      <p className="mb-3">
        <strong>Email:</strong> {guide.email || "-"}
      </p>

      <div className="flex gap-2">
        <Link to="/guide/profile">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            View Profile
          </button>
        </Link>
        <Link to="/guide/edit">
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GuideCard;
