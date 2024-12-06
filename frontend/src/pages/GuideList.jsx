import React, { useState, useEffect } from "react";
import axios from "axios";

const GuideList = () => {
  const [availableGuides, setAvailableGuides] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch available guides when the component mounts
    const fetchAvailableGuides = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guides");
        console.log("Guides data:", response.data); // Debugging step-very useful
        setAvailableGuides(response.data);
      } catch (error) {
        console.error("Error fetching guides", error);
        setMessage("Failed to fetch guides.");
      }
    };

    fetchAvailableGuides();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Guides</h2>
      {message && <p className="text-center text-red-600 mb-4">{message}</p>}
      {availableGuides.length === 0 ? (
        <p className="text-center text-gray-700">No guides available</p>
      ) : (
        <div className="space-y-4">
          {availableGuides.map((guide) => (
            <div
              key={guide._id}
              className="p-4 bg-white rounded-md shadow-sm border border-gray-300"
            >
              <h3 className="text-xl font-semibold">
                {guide.FullName || "No Name"}
              </h3>
              <p className="text-gray-700 mt-2">
                <strong>Email:</strong> {guide.email}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Phone Number:</strong> {guide.phoneNumber}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Bio:</strong> {guide.bio}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Languages:</strong> {guide.languages.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuideList;
