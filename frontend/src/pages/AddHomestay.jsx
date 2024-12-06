import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHomestay = () => {
  const [homestayDetails, setHomestayDetails] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    amenities: "",
    photos: null, // Initialize photos as null for file input
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setHomestayDetails({ ...homestayDetails, photos: e.target.files }); // Capture files
  };

  const handleHomestayRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", homestayDetails.name);
      formData.append("location", homestayDetails.location);
      formData.append("description", homestayDetails.description);
      formData.append("pricePerNight", homestayDetails.pricePerNight);
      formData.append(
        "amenities",
        JSON.stringify(
          homestayDetails.amenities.split(",").map((item) => item.trim())
        )
      );

      if (homestayDetails.photos) {
        for (let i = 0; i < homestayDetails.photos.length; i++) {
          formData.append("photos", homestayDetails.photos[i]); // Append each photo
        }
      }

      const response = await axios.post(
        "https://tourism-platform.onrender.com/homestays/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicate file upload
          },
        }
      );

      alert("Homestay registered successfully!");
      navigate("/login");
    } catch (err) {
      setError("Failed to register homestay. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white text-gray-900 p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Register New Homestay
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleHomestayRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Homestay Name
            </label>
            <input
              type="text"
              id="name"
              value={homestayDetails.name}
              onChange={(e) =>
                setHomestayDetails({ ...homestayDetails, name: e.target.value })
              }
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={homestayDetails.location}
              onChange={(e) =>
                setHomestayDetails({
                  ...homestayDetails,
                  location: e.target.value,
                })
              }
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={homestayDetails.description}
              onChange={(e) =>
                setHomestayDetails({
                  ...homestayDetails,
                  description: e.target.value,
                })
              }
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="pricePerNight"
              className="block text-sm font-medium"
            >
              Price Per Night
            </label>
            <input
              type="number"
              id="pricePerNight"
              value={homestayDetails.pricePerNight}
              onChange={(e) =>
                setHomestayDetails({
                  ...homestayDetails,
                  pricePerNight: e.target.value,
                })
              }
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label htmlFor="amenities" className="block text-sm font-medium">
              Amenities (Comma Separated)
            </label>
            <input
              type="text"
              id="amenities"
              value={homestayDetails.amenities}
              onChange={(e) =>
                setHomestayDetails({
                  ...homestayDetails,
                  amenities: e.target.value,
                })
              }
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label htmlFor="photos" className="block text-sm font-medium">
              Photos
            </label>
            <input
              type="file"
              id="photos"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold transition"
          >
            Register Homestay
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHomestay;
