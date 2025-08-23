// src/guide/GuideDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  fetchGuideBookings,
  updateBookingStatus,
} from "../features/bookings/bookingSlice";
import { useNavigate } from "react-router-dom";

const GuideDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading: authLoading } = useSelector((state) => state.auth);

  const dashboardBookings = useSelector(
    (state) => state.bookings.guideBookings
  );
  const bookingLoading = useSelector((state) => state.bookings.loading);
  const bookingError = useSelector((state) => state.bookings.error);

  const [highlightedIds, setHighlightedIds] = useState([]);
  const previousBookingIds = useRef([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (user?.role === "guide") {
      const fetchBookings = async () => {
        await dispatch(fetchGuideBookings());
      };

      fetchBookings();
      const interval = setInterval(fetchBookings, 15000);
      return () => clearInterval(interval);
    }
  }, [user, dispatch]);

  useEffect(() => {
    const currentIds = dashboardBookings?.map((b) => b._id) || [];
    const newIds = currentIds.filter(
      (id) => !previousBookingIds.current.includes(id)
    );
    if (newIds.length > 0) setHighlightedIds(newIds);
    previousBookingIds.current = currentIds;

    const timeout = setTimeout(() => {
      setHighlightedIds([]);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [dashboardBookings]);

  const handleStatusUpdateClick = (bookingId, status) => {
    dispatch(updateBookingStatus({ bookingId, status }));
  };

  if (authLoading || !user || bookingLoading) {
    return <Loader />;
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      {/* --- Booking Requests --- */}
      <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
      {bookingError && (
        <p className="text-red-600 mb-4 font-medium">{bookingError}</p>
      )}
      {!dashboardBookings || dashboardBookings.length === 0 ? (
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
                  User: {userName}
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
    </main>
  );
};

export default GuideDashboard;
