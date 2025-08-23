// src/homestays/BookHomestay.jsx
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import homestayService from "../services/homestayService";
import bookingService from "../services/bookingService";
import Button from "../components/Button";

const BookHomestay = () => {
  const { token } = useSelector((state) => state.auth);
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking form state
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchHomestays = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await homestayService.getAvailableHomestays();
        setHomestays(res.homestays || []);
      } catch (err) {
        setError(err.message || "Failed to fetch homestays");
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  const handleBook = async () => {
    if (!startDate || !endDate || !guests) {
      alert("Please fill all booking details.");
      return;
    }

    try {
      await bookingService.createBooking(
        "homestay", // type
        selectedHomestay._id, // homestay id
        {
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          guests: Number(guests),
          notes,
        }
      );

      alert("Booking request sent! Awaiting owner approval.");
      setSelectedHomestay(null);
      setStartDate("");
      setEndDate("");
      setGuests(1);
      setNotes("");
    } catch (err) {
      alert("Failed to submit booking: " + err.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!homestays || homestays.length === 0)
    return (
      <p className="text-gray-500 text-center mt-6">No homestays available.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Book a Homestay</h1>

      {/* Homestay cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homestays.map((homestay) => (
          <div
            key={homestay._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{homestay.title}</h2>
              <p className="text-gray-600 mb-1">
                Location: {homestay.location}
              </p>
              <p className="text-gray-600 mb-1">
                Price: ₹{homestay.pricePerNight || homestay.price}
              </p>
            </div>
            <Button
              onClick={() => setSelectedHomestay(homestay)}
              className="bg-green-600 hover:bg-green-700 mt-2"
            >
              Book Now
            </Button>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {selectedHomestay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Book {selectedHomestay.title}
            </h2>

            <label className="block mb-2">Start Date:</label>
            <input
              type="date"
              className="w-full border rounded p-2 mb-3"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label className="block mb-2">End Date:</label>
            <input
              type="date"
              className="w-full border rounded p-2 mb-3"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <label className="block mb-2">Guests:</label>
            <input
              type="number"
              min="1"
              className="w-full border rounded p-2 mb-3"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />

            <label className="block mb-2">Notes:</label>
            <textarea
              className="w-full border rounded p-2 mb-3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex justify-between">
              <Button
                onClick={handleBook}
                className="bg-green-600 hover:bg-green-700"
              >
                Confirm Booking
              </Button>
              <Button
                onClick={() => setSelectedHomestay(null)}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookHomestay;
