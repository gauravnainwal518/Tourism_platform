import React, { useState } from "react";
import axios from "axios";

const AddGuide = () => {
  const [guideData, setGuideData] = useState({
    FullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    languages: "",
  });
  const [message, setMessage] = useState("");

  const handleGuideRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(
        "https://tourism-platform.onrender.com/api/guides",
        {
          ...guideData,
          languages: guideData.languages.split(",").map((lang) => lang.trim()), // Split and trim languages
        }
      );
      setMessage("Guide registered successfully!");
      setGuideData({
        FullName: "",
        email: "",
        phoneNumber: "",
        bio: "",
        languages: "",
      });
    } catch (error) {
      console.error("Guide registration failed", error);
      setMessage("Failed to register guide. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Register as Guide
        </h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleGuideRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-indigo-300"
            value={guideData.FullName}
            onChange={(e) =>
              setGuideData({ ...guideData, FullName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-indigo-300"
            value={guideData.email}
            onChange={(e) =>
              setGuideData({ ...guideData, email: e.target.value })
            }
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-indigo-300"
            value={guideData.phoneNumber}
            onChange={(e) =>
              setGuideData({ ...guideData, phoneNumber: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Bio"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-indigo-300"
            value={guideData.bio}
            onChange={(e) =>
              setGuideData({ ...guideData, bio: e.target.value })
            }
            required
          ></textarea>

          <input
            type="text"
            placeholder="Languages (comma-separated)"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring focus:ring-indigo-300"
            value={guideData.languages}
            onChange={(e) =>
              setGuideData({ ...guideData, languages: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Register Guide
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGuide;
