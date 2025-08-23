import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import guideService from "../services/guideService";
import bookingService from "../services/bookingService";
import Loader from "../components/Loader";
import Button from "../components/Button";

const BookGuide = () => {
  const { user } = useSelector((state) => state.auth);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking form state
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await guideService.getAllGuides();
        //console.log("Fetched guides:", res);
        setGuides(res || []);
      } catch (err) {
        setError(err.message || "Failed to fetch guides");
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const handleBook = async () => {
    if (!user) return alert("Please login to book a guide.");
    if (!date) return alert("Please select a date.");

    try {
      await bookingService.createBooking("guide", selectedGuide._id, {
        date: new Date(date).toISOString(),
        notes: notes || "",
      });

      alert("Booking request sent! Awaiting guide confirmation.");
      setSelectedGuide(null);
      setDate("");
      setNotes("");
    } catch (err) {
      alert("Failed to submit booking: " + err.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!guides || guides.length === 0)
    return (
      <p className="text-gray-500 text-center mt-6">No guides available.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Book a Guide</h1>

      {/* Guide cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div
            key={guide._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">
                {guide.user?.email || "Name N/A"}
              </h2>
              <p className="text-gray-600 mb-1">
                Phone: {guide.mobile || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">Region: {guide.region}</p>
              <p className="text-gray-600 mb-1">
                Experience: {guide.experience} years
              </p>
              <p className="text-gray-600 mb-1">
                Languages: {guide.languages?.join(", ")}
              </p>
            </div>
            <Button
              onClick={() => setSelectedGuide(guide)}
              className="bg-green-600 hover:bg-green-700 mt-2"
            >
              Book Now
            </Button>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Book {selectedGuide.user?.email || "Guide"}
            </h2>

            <label className="block mb-2">Date:</label>
            <input
              type="date"
              className="w-full border rounded p-2 mb-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
                onClick={() => setSelectedGuide(null)}
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

export default BookGuide;
