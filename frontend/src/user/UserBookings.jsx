// its shows all bookings and itnegrated with userDashboard-> future use not used yet.

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserBookings,
  cancelBooking,
} from "../features/bookings/bookingSlice";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import Button from "../components/Button";

const UserBookings = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const { bookings, loading, error } = useSelector((state) => state.bookings);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  useEffect(() => {
    if (token) dispatch(fetchUserBookings(token));
  }, [token, dispatch]);

  const handleCancel = (bookingId) => {
    if (token) dispatch(cancelBooking({ bookingId, token }));
  };

  // Calculate pagination
  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!bookings || bookings.length === 0)
    return <p className="text-gray-400 text-center mt-6">No bookings found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentBookings.map((booking) => (
          <div
            key={booking._id}
            className="p-4 bg-gray-800 rounded text-white flex flex-col justify-between"
          >
            <div>
              <p>
                <strong>Type:</strong> {booking.type}
              </p>
              <p>
                <strong>Item:</strong>{" "}
                {booking.type === "guide"
                  ? booking.guide?.user?.name ||
                    booking.guide?.user?.email ||
                    "N/A"
                  : booking.homestay?.title || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {booking.date
                  ? new Date(booking.date).toLocaleDateString()
                  : "N/A"}
              </p>
              {booking.notes && (
                <p>
                  <strong>Notes:</strong> {booking.notes}
                </p>
              )}
              <p>
                <strong>Status:</strong> {booking.status || "Pending"}
              </p>
            </div>
            {booking.status !== "cancelled" && (
              <Button
                onClick={() => handleCancel(booking._id)}
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                Cancel
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
