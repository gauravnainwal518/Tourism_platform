//future use
//this page not used yet
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const GuideEarnings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const fetchEarnings = async () => {
    try {
      const res = await axios.get("/api/bookings/completed-for-guide");
      setBookings(res.data);

      // Calculate total earnings
      const total = res.data.reduce((sum, b) => sum + (b.amount || 0), 0);
      setTotalEarnings(total);
    } catch (err) {
      console.error("Error fetching guide earnings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Earnings</h2>

      <div className="text-center mb-8">
        <p className="text-2xl font-semibold">Total Earned: ₹{totalEarnings}</p>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-400">
          No completed bookings found.
        </p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div key={b._id} className="bg-gray-800 p-4 rounded-md shadow-md">
              <p>
                <strong>Booking ID:</strong> {b._id}
              </p>
              <p>
                <strong>Tourist:</strong> {b.touristName}
              </p>
              <p>
                <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Duration:</strong> {b.duration} days
              </p>
              <p>
                <strong>Amount Earned:</strong> ₹{b.amount}
              </p>
              <p>
                <strong>Status:</strong> {b.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuideEarnings;
