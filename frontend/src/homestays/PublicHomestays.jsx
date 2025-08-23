import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHomestays } from "../features/homestays/homestaySlice";
import Loader from "../components/Loader";

const PublicHomestays = () => {
  const dispatch = useDispatch();
  const { homestays, loading, error } = useSelector((state) => state.homestays);

  useEffect(() => {
    dispatch(fetchAllHomestays());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-center text-red-500 font-medium mt-6">
        {error || "Failed to load homestays"}
      </p>
    );

  return (
    <div className="min-h-screen bg-white container mx-auto px-4 py-8">
      {/* Gentle blinking login message */}
      <p className="text-center text-red-600 font-semibold text-lg mb-6 animate-pulse">
        For a better experience, please login to book homestays and access all
        features in your dashboard!
      </p>

      <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
        Explore Homestays
      </h1>

      {homestays.length === 0 ? (
        <p className="text-center text-gray-600">No homestays available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestays.map((homestay) => (
            <div
              key={homestay._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-800">
                {homestay.title || "Unnamed Homestay"}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Location:</span>{" "}
                {homestay.location}
              </p>

              <p className="text-gray-700">
                <span className="font-medium">Price:</span> ₹{homestay.price}{" "}
                per night
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicHomestays;
