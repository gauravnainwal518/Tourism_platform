import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  fetchPendingGuides,
  fetchPendingHomestays,
  approveGuideAsync,
  rejectGuideAsync,
  approveHomestay,
  rejectHomestay,
} from "../features/admin/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {
    user, // use user instead of admin
    guidesLoading,
    homestaysLoading,
    pendingGuides,
    pendingHomestays,
    error,
  } = useSelector((state) => state.admin);

  // Fetch data automatically if user exists and is admin
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    console.log("[AdminDashboard] Admin detected, fetching data...");

    dispatch(fetchPendingGuides()).catch((err) =>
      console.error("[AdminDashboard] Guides fetch error:", err)
    );

    dispatch(fetchPendingHomestays()).catch((err) =>
      console.error("[AdminDashboard] Homestays fetch error:", err)
    );
  }, [user, dispatch]);

  if (!user || user.role !== "admin")
    return <p className="p-6">Please login as admin.</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Pending Guides */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Pending Guide Applications
        </h2>
        {guidesLoading ? (
          <Loader />
        ) : pendingGuides.length === 0 ? (
          <p>No pending guides.</p>
        ) : (
          pendingGuides.map((g) => (
            <div
              key={g._id}
              className="flex justify-between bg-white p-4 rounded shadow mb-4"
            >
              <div>
                <p>
                  <strong>Name:</strong> {g.user.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {g.user.email}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(approveGuideAsync(g._id))}
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => dispatch(rejectGuideAsync(g._id))}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Pending Homestays */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pending Homestays</h2>
        {homestaysLoading ? (
          <Loader />
        ) : pendingHomestays.length === 0 ? (
          <p>No pending homestays.</p>
        ) : (
          pendingHomestays.map((h) => (
            <div key={h._id} className="p-4 bg-white rounded shadow mb-4">
              <h3 className="text-xl font-semibold">{h.title || h.name}</h3>
              <p>
                <strong>Location:</strong> {h.location}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => dispatch(approveHomestay(h._id))}
                  className="bg-green-700 text-white px-3 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => dispatch(rejectHomestay(h._id))}
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {error && <p className="text-red-600 mt-6">{error}</p>}
    </div>
  );
};

export default AdminDashboard;
