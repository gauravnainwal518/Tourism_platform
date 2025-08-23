import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerHomestayBookings } from "../features/bookings/bookingSlice";
import Loader from "../components/Loader";

const OwnerBookings = () => {
  const dispatch = useDispatch();

  const ownerBookings = useSelector((state) => state.bookings.ownerBookings);
  const loading = useSelector((state) => state.bookings.loading);
  const error = useSelector((state) => state.bookings.error);

  //  Map over the bookings array inside ownerBookings
  const bookings = ownerBookings?.bookings || [];

  useEffect(() => {
    //console.log("Fetching owner homestay bookings...");
    dispatch(fetchOwnerHomestayBookings()).then((res) => {
      //console.log("Fetched owner bookings payload:", res.payload);
    });
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error)
    return <p className="text-center text-red-500 mt-4 font-medium">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Homestay Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Guest Name
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Homestay
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Start Date
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  End Date
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                const guestName = booking.user?.fullName || "N/A";
                const guestEmail = booking.user?.email || "N/A";
                const homestayName = booking.homestay?.name || "N/A";
                const startDate = booking.startDate
                  ? new Date(booking.startDate).toLocaleDateString()
                  : "N/A";
                const endDate = booking.endDate
                  ? new Date(booking.endDate).toLocaleDateString()
                  : "N/A";

                return (
                  <tr
                    key={booking._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="border p-3 text-sm">{guestName}</td>
                    <td className="border p-3 text-sm">{guestEmail}</td>
                    <td className="border p-3 text-sm">{homestayName}</td>
                    <td className="border p-3 text-sm">{startDate}</td>
                    <td className="border p-3 text-sm">{endDate}</td>
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
                    <td className="border p-3 text-sm">
                      {booking.notes || "-"}
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

export default OwnerBookings;
