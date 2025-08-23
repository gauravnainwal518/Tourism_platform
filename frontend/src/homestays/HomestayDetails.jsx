import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomestayById,
  bookHomestay,
  clearBookingState,
} from "../features/homestays/homestaySlice";
import Loader from "../components/Loader";
import Button from "../components/Button";

const HomestayDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedHomestay,
    loading,
    error,
    bookingLoading,
    bookingError,
    bookingSuccess,
  } = useSelector((state) => state.homestays);

  const user = useSelector((state) => state.auth.user);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchHomestayById({ id }));
    }
    return () => {
      dispatch(clearBookingState());
    };
  }, [id, dispatch]);

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }
    const bookingData = { startDate, endDate, guests, notes };
    dispatch(bookHomestay({ id, bookingData }));
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-red-500 text-center mt-6">
        {error || "Failed to load homestay details"}
      </p>
    );

  if (!selectedHomestay)
    return (
      <p className="text-gray-500 text-center mt-6">
        No homestay found for the given ID.
      </p>
    );

  const { title, description, location, price, images, status, owner } =
    selectedHomestay;

  const ownerName = owner?.fullName || "N/A";
  const ownerEmail = owner?.email || "N/A";

  return (
    // Full-page light background
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
        <Button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          ← Back
        </Button>

        <h1 className="text-3xl font-bold mb-4">{title}</h1>

        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${title} - ${index + 1}`}
                className="w-full h-60 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-60 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg mb-4 border border-gray-200">
            No Image
          </div>
        )}

        <p className="mb-2">
          <strong>Location:</strong> {location}
        </p>
        <p className="mb-2">
          <strong>Price per night:</strong> ₹{price}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {status}
        </p>
        <p className="mb-4">{description}</p>

        <div className="mt-6 p-4 bg-gray-100 rounded mb-6 border border-gray-200">
          <p className="mb-1">
            <strong>Owner Name:</strong> {ownerName}
          </p>
          <p>
            <strong>Owner Email:</strong> {ownerEmail}
          </p>
        </div>

        {user && user.role === "user" && status === "approved" && (
          <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Book This Homestay</h2>

            <div className="mb-2">
              <label className="mr-2">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-1 rounded border border-gray-300"
              />
            </div>

            <div className="mb-2">
              <label className="mr-2">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-1 rounded border border-gray-300"
              />
            </div>

            <div className="mb-2">
              <label className="mr-2">Guests:</label>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="p-1 rounded border border-gray-300 w-20"
              />
            </div>

            <div className="mb-4">
              <label className="mr-2">Notes:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="p-1 rounded border border-gray-300 w-full"
              />
            </div>

            {bookingError && (
              <p className="text-red-500 mb-2">{bookingError}</p>
            )}
            {bookingSuccess && (
              <p className="text-green-500 mb-2">{bookingSuccess}</p>
            )}

            <Button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomestayDetails;
