import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const HomestayCard = ({ homestay, onViewDetails, onDelete }) => {
  const navigate = useNavigate();

  // Navigate to edit page
  const handleEdit = () => {
    navigate(`/homestays/${homestay._id}/edit`);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
      {/* Photo */}
      {homestay.images && homestay.images.length > 0 ? (
        <img
          src={homestay.images[0]}
          alt={homestay.title || homestay.name}
          className="w-full h-44 object-cover rounded-lg mb-3 border border-gray-200"
        />
      ) : (
        <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg mb-3 border border-gray-200">
          No Image
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold mb-1 text-gray-900">
        {homestay.title || homestay.name}
      </h3>

      {/* Location */}
      <p className="mb-1 text-gray-700">
        <strong>Location:</strong> {homestay.location}
      </p>

      {/* Price */}
      <p className="mb-1 text-gray-700 font-semibold">
        <strong>Price per night:</strong> ₹{homestay.price || "-"}
      </p>

      {/* Status */}
      <p className="mb-2 text-gray-500 text-sm italic">
        <strong>Status:</strong> {homestay.status || "pending"}
      </p>

      {/* Buttons */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {onViewDetails && (
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => onViewDetails(homestay._id)}
          >
            View
          </Button>
        )}

        {/* Edit button navigates directly */}
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={handleEdit}
        >
          Edit
        </Button>

        {onDelete && (
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => onDelete(homestay._id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomestayCard;
