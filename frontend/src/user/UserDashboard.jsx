import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import {
  fetchUserBookings,
  cancelBooking,
} from "../features/bookings/bookingSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const bookingsState = useSelector((state) => state.bookings);
  const userBookings = bookingsState.userBookings || [];
  const bookingsLoading = bookingsState.loading;

  const [guideBookings, setGuideBookings] = useState([]);
  const [homestayBookings, setHomestayBookings] = useState([]);
  const [highlightedIds, setHighlightedIds] = useState([]);
  const previousBookingIds = useRef([]);

  const [guidePage, setGuidePage] = useState(1);
  const [homestayPage, setHomestayPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (!authLoading && !user) window.location.href = "/login";
  }, [authLoading, user]);

  const fetchAllBookings = async () => {
    if (!user) return;
    try {
      await dispatch(fetchUserBookings()).unwrap();
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  useEffect(() => {
    if (user && !authLoading) {
      fetchAllBookings();
      const interval = setInterval(fetchAllBookings, 15000);
      return () => clearInterval(interval);
    }
  }, [user, authLoading]);

  useEffect(() => {
    const guides = userBookings.filter((b) => b.type === "guide");
    const homestays = userBookings.filter((b) => b.type === "homestay");
    setGuideBookings(guides);
    setHomestayBookings(homestays);
  }, [userBookings]);

  useEffect(() => {
    const allBookings = [...guideBookings, ...homestayBookings];
    const currentIds = allBookings.map((b) => b._id || b.id);
    const newIds = currentIds.filter(
      (id) => !previousBookingIds.current.includes(id)
    );

    if (newIds.length > 0) {
      setHighlightedIds(newIds);
      const timeout = setTimeout(() => setHighlightedIds([]), 5000);
      return () => clearTimeout(timeout);
    }

    previousBookingIds.current = currentIds;
  }, [guideBookings, homestayBookings]);

  const handleCancelBooking = async (booking) => {
    try {
      await dispatch(
        cancelBooking({
          type: booking.type,
          bookingId: booking._id || booking.id,
        })
      ).unwrap();
      fetchAllBookings();
    } catch (err) {
      alert(err.message || "Failed to cancel booking");
    }
  };

  if (authLoading || bookingsLoading) return <Loader />;
  if (!user) return null;

  const paginatedGuideBookings = guideBookings.slice(0, guidePage * pageSize);
  const paginatedHomestayBookings = homestayBookings.slice(
    0,
    homestayPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 space-y-8">
      {/* Guide Bookings */}
      <section className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
            Guide Bookings
          </h2>
          {guideBookings.length > pageSize && (
            <button
              onClick={() => setGuidePage((prev) => prev + 1)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mb-2 sm:mb-0"
            >
              Load More
            </button>
          )}
        </div>
        {paginatedGuideBookings.length === 0 ? (
          <p className="text-gray-600">No guide bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedGuideBookings.map((booking) => {
              const isNew = highlightedIds.includes(booking._id || booking.id);
              return (
                <div
                  key={booking._id || booking.id}
                  className={`bg-white shadow rounded-lg p-4 transition-all ${
                    isNew ? "border-2 border-green-500 animate-pulse" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Guide: {booking?.guide?.user?.email || "N/A"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Date:{" "}
                    {booking?.date
                      ? new Date(booking.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Status: {booking?.status || "Pending"}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Notes: {booking?.notes || "-"}
                  </p>
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancelBooking(booking)}
                      className="mt-4 w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Homestay Bookings */}
      <section className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
            Homestay Bookings
          </h2>
          {homestayBookings.length > pageSize && (
            <button
              onClick={() => setHomestayPage((prev) => prev + 1)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mb-2 sm:mb-0"
            >
              Load More
            </button>
          )}
        </div>
        {paginatedHomestayBookings.length === 0 ? (
          <p className="text-gray-600">No homestay bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedHomestayBookings.map((booking) => {
              const isNew = highlightedIds.includes(booking._id || booking.id);
              return (
                <div
                  key={booking._id || booking.id}
                  className={`bg-white shadow rounded-lg p-4 transition-all ${
                    isNew ? "border-2 border-green-500 animate-pulse" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking?.homestay?.title || "N/A"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Location: {booking?.homestay?.location || "N/A"}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Date:{" "}
                    {booking?.startDate
                      ? new Date(booking.startDate).toLocaleDateString()
                      : "N/A"}{" "}
                    -{" "}
                    {booking?.endDate
                      ? new Date(booking.endDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Guests: {booking?.guests || 1}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Status: {booking?.status || "Pending"}
                  </p>
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancelBooking(booking)}
                      className="mt-4 w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Cancel Booking
                    </button>
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

export default UserDashboard;
