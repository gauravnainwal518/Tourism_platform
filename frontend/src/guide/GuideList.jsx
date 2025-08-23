//public page for guide showing
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuides } from "../features/guide/guideSlice";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const GuideList = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const { guides, loading, error } = useSelector((state) => state.guide);

  useEffect(() => {
    dispatch(getAllGuides(token));
  }, [dispatch, token]);

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-center text-red-500 font-medium">Error: {error}</p>
    );

  return (
    <div className="min-h-screen bg-white container mx-auto px-4 py-8">
      {/* Gentle blinking login message */}
      <p className="text-center text-red-600 font-semibold text-lg mb-6 animate-pulse">
        For a better experience, please login to book guides and access all
        features in your dashboard!
      </p>

      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Available Guides
      </h2>

      {guides.length === 0 ? (
        <p className="text-center text-gray-600">No guides available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-800">
                {guide.user?.name ||
                  guide.guideUser?.fullName ||
                  "Unknown Guide"}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Region:</span> {guide.region}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Languages:</span>{" "}
                {guide.languages?.join(", ")}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Experience:</span>{" "}
                {guide.experience} years
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuideList;
