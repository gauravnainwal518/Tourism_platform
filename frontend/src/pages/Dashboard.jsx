import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Note- here localstorage some time create problem so we create direct welcome guest message and paragraph in future we add some functionality like user booking tracking etc.

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate to other pages

  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error messages

  const handleLogout = () => {
    // Clear user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser) {
        JSON.parse(storedUser); // Parse user data just to check its validity
      } else {
        setError("User data not found in localStorage");
      }
    } catch (err) {
      setError("Error parsing user data from localStorage");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold">
          Welcome, Guest! Explore beautiful experiences and adventures!
        </h1>

        <div className="mt-6 text-bold text-gray-600">
          <p>
            Welcome to your dashboard! Uttarakhand, often referred to as the
            "Land of the Gods," is a picturesque state in northern India known
            for its stunning natural beauty. Nestled in the Himalayas, it is
            home to majestic snow-capped peaks, serene lakes, and lush green
            valleys. The state boasts sacred pilgrimage sites such as Kedarnath,
            Badrinath, Haridwar, and Rishikesh, attracting millions of devotees
            and spiritual seekers. Adventure enthusiasts can explore thrilling
            trekking routes, white-water rafting in the Ganges, and skiing in
            Auli. Uttarakhand is rich in biodiversity, with famous national
            parks like Jim Corbett and Valley of Flowers. The state is also
            renowned for its vibrant culture, traditional music, and festivals.
            Don't miss savoring the local cuisine, featuring dishes like Bhang
            ki Chutney, Aloo ke Gutke, and Kafuli. Explore charming hill
            stations like Nainital, Mussoorie, and Almora for a tranquil
            getaway. Whether you're seeking spiritual solace, adventure, or
            serenity, Uttarakhand offers a unique experience for everyone.
          </p>
        </div>

        <div className="mt-6 flex space-x-4 justify-center">
          <button
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
            onClick={() => navigate("/experiences")}
          >
            Explore
          </button>
          <button
            className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
            onClick={() => navigate("/bookings")}
          >
            Book
          </button>
          <button
            className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-semibold"
            onClick={() => navigate("/guides")}
          >
            Guides
          </button>
          <button
            className="py-2 px-4 bg-purple-500 hover:bg-purple-600 rounded text-white font-semibold"
            onClick={() => navigate("/homestays")}
          >
            Homestays
          </button>
        </div>

        <button
          className="mt-6 py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white font-semibold w-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
//in future we create different- different dashboard for each user like tourist, guide and host dashboard
