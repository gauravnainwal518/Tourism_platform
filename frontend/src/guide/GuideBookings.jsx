import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuideBookings } from "../features/bookings/bookingSlice";
import Loader from "../components/Loader";

const GuideBookings = () => {
  const dispatch = useDispatch();

  // Select the state correctly
  const guideBookings = useSelector((state) => state.bookings.guideBookings);
  const loading = useSelector((state) => state.bookings.loading);
  const error = useSelector((state) => state.bookings.error);

  useEffect(() => {
    //console.log("Fetching guide bookings...");
    dispatch(fetchGuideBookings()).then((res) => {
      // console.log("Fetched guide bookings payload:", res.payload);
    });
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Bookings Received</h2>

      {guideBookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  User Name
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  User Email
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Booking Date
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {guideBookings.map((booking, index) => {
                const userName = booking.user?.fullName || "N/A";
                const userEmail = booking.user?.email || "N/A";
                const bookingDate = booking.date
                  ? new Date(booking.date).toLocaleDateString()
                  : "N/A";

                return (
                  <tr
                    key={booking._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="border p-3 text-sm">{userName}</td>
                    <td className="border p-3 text-sm">{userEmail}</td>
                    <td className="border p-3 text-sm">{bookingDate}</td>
                    <td className="border p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          booking.status === "accepted"
                            ? "bg-green-500"
                            : booking.status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {booking.status
                          ? booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)
                          : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuideBookings;
