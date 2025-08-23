import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllHomestays,
  updateExistingHomestay,
} from "../features/homestays/homestaySlice";
import Button from "../components/Button";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

const HomestayApplication = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { homestays, loading, error } = useSelector((state) => state.homestays);

  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllHomestays(token));
    }
  }, [dispatch, token]);

  const pendingHomestays = homestays.filter((h) => h.status === "pending");

  const handleApproval = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this homestay?`))
      return;

    try {
      setProcessingId(id);
      await dispatch(
        updateExistingHomestay({ id, homestayData: { status }, token })
      ).unwrap();
      dispatch(fetchAllHomestays(token)); // refresh list after update
    } catch (err) {
      console.error("Failed to update homestay:", err);
      alert("Failed to update homestay. Try again.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-500 font-medium">Error: {error}</p>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Pending Homestay Applications</h2>

      {pendingHomestays.length === 0 ? (
        <p className="text-gray-500">No pending homestay applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Price/Night</th>
                <th className="border p-2">Owner</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingHomestays.map((homestay) => (
                <tr key={homestay._id}>
                  <td className="border p-2">
                    {homestay.photos && homestay.photos.length > 0 ? (
                      <img
                        src={homestay.photos[0]}
                        alt={homestay.title || homestay.name}
                        className="w-20 h-16 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border p-2">
                    {homestay.title || homestay.name}
                  </td>
                  <td className="border p-2">{homestay.location}</td>
                  <td className="border p-2">₹{homestay.pricePerNight}</td>
                  <td className="border p-2">
                    {homestay.ownerName || homestay.ownerEmail}
                  </td>
                  <td className="border p-2 space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleApproval(homestay._id, "approved")}
                      disabled={processingId === homestay._id}
                    >
                      {processingId === homestay._id
                        ? "Processing..."
                        : "Approve"}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleApproval(homestay._id, "rejected")}
                      disabled={processingId === homestay._id}
                    >
                      {processingId === homestay._id
                        ? "Processing..."
                        : "Reject"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomestayApplication;
