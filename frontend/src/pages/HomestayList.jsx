import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import homestayService from "../services/homestayService";

const HomestayList = () => {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch homestays on component mount
  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const data = await homestayService.getAllHomestays();
        setHomestays(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load homestays");
        setLoading(false);
      }
    };
    fetchHomestays();
  }, []);

  // Navigate to the booking page with homestay details
  const handleBooking = (homestay) => {
    navigate("/bookings", { state: { homestay } });
  };

  if (loading) {
    return <p>Loading homestays...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto my-10 flex justify-center items-center h-screen">
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Available Homestays
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestays.map((homestay) => (
            <div
              key={homestay._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Loop through the photos array and display each photo */}
              {homestay.photos && homestay.photos.length > 0 ? (
                homestay.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo} // Assuming the backend provides the full image URL
                    alt={`Homestay ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                ))
              ) : (
                <p>No photos available</p> // If no photos are available
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{homestay.name}</h2>
                <p className="text-gray-600">{homestay.description}</p>
                <p className="text-gray-900 font-bold mt-2">
                  Price: ₹{homestay.pricePerNight} / night
                </p>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleBooking(homestay)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomestayList;
//Note- here photo section functionality is bit complex so see it carefully
