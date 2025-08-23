import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import {
  fetchOwnerHomestays,
  deleteExistingHomestay,
} from "../features/homestays/homestaySlice";

import { fetchOwnerHomestayBookings } from "../features/bookings/bookingSlice";

//service for booking updates
import homestayService from "../services/homestayService";

//card component
import HomestayCard from "./HomestayCard";

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors

  const {
    ownerHomestays = [],
    loading: homestayLoading = false,
    error: homestayError = null,
  } = useSelector((state) => state.homestays || {});

  const bookingState = useSelector((state) => state.bookings || {});
  const dashboardBookings = bookingState.ownerBookings?.bookings || [];
  const bookingLoading = bookingState.loading || false;
  const bookingError = bookingState.error || null;

  // get token from auth state
  const { token } = useSelector((state) => state.auth || {});

  // Highlight new bookings

  const [highlightedIds, setHighlightedIds] = useState([]);
  const previousBookingIds = useRef([]);

  // Fetch data only when token exists

  useEffect(() => {
    if (!token) return;

    dispatch(fetchOwnerHomestays());
    dispatch(fetchOwnerHomestayBookings());

    const interval = setInterval(() => {
      dispatch(fetchOwnerHomestayBookings());
    }, 15000);

    return () => clearInterval(interval);
  }, [dispatch, token]);

  // Highlight new booking requests for 5 seconds
  useEffect(() => {
    const currentIds = dashboardBookings.map((b) => b._id);
    const newIds = currentIds.filter(
      (id) => !previousBookingIds.current.includes(id)
    );
    if (newIds.length > 0) setHighlightedIds(newIds);
    previousBookingIds.current = currentIds;

    const timeout = setTimeout(() => setHighlightedIds([]), 5000);
    return () => clearTimeout(timeout);
  }, [dashboardBookings]);

  // Event Handlers

  const handleDeleteHomestay = (id) => {
    if (window.confirm("Are you sure you want to delete this homestay?")) {
      dispatch(deleteExistingHomestay({ id }));
    }
  };

  const handleEdit = (id) => navigate(`/homestays/edit/${id}`);
  const handleView = (id) => navigate(`/homestays/${id}`);

  const handleStatusUpdateClick = async (bookingId, status) => {
    try {
      await homestayService.updateBookingStatus(bookingId, status);
      dispatch(fetchOwnerHomestayBookings()); // refresh bookings after status update
    } catch (err) {
      console.error("Error updating booking status:", err.message);
      alert("Failed to update booking status. Make sure you have permission.");
    }
  };

  // Loader

  if (homestayLoading || bookingLoading) return <Loader />;

  // Render

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>

      {/* Homestays Section */}
      <section>
        <h2 className="text-xl font-semibold mb-3">My Homestays</h2>
        {homestayError && (
          <p className="text-red-600 mb-2">Error: {homestayError}</p>
        )}
        {ownerHomestays.length === 0 ? (
          <p>You haven’t registered any homestays yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ownerHomestays.map((homestay) => (
              <HomestayCard
                key={homestay._id}
                homestay={homestay}
                onViewDetails={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteHomestay}
              />
            ))}
          </div>
        )}
      </section>

      {/* Booking Requests Section */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Booking Requests</h2>
        {bookingError && (
          <p className="text-red-600 mb-2 font-medium">{bookingError}</p>
        )}
        {dashboardBookings.length === 0 ? (
          <p className="text-gray-600">No booking requests yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardBookings.map((booking) => {
              const isNew = highlightedIds.includes(booking._id);
              const userName = booking.user?.fullName || "Unknown User";
              const bookingDate = booking.date
                ? new Date(booking.date).toLocaleDateString()
                : "No date";

              return (
                <div
                  key={booking._id}
                  className={`bg-white shadow rounded-lg p-6 transition-all ${
                    isNew ? "border-2 border-green-500 animate-pulse" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    Guest: {userName}
                  </h3>
                  <p className="text-gray-500 mt-1">Date: {bookingDate}</p>
                  <p className="text-gray-500 mt-1">Status: {booking.status}</p>
                  <p className="text-gray-500 mt-1">
                    Notes: {booking.notes || "-"}
                  </p>

                  {booking.status === "pending" && (
                    <div className="flex mt-4 gap-2">
                      <button
                        onClick={() =>
                          handleStatusUpdateClick(booking._id, "accepted")
                        }
                        className="flex-1 px-3 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdateClick(booking._id, "rejected")
                        }
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default OwnerDashboard;
