import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingGuides,
  approveGuideAsync,
  rejectGuideAsync,
} from "../features/admin/adminSlice";
import Loader from "../components/Loader";
import Button from "../components/Button";

const GuideApplication = () => {
  const dispatch = useDispatch();
  const { pendingGuides, guidesLoading, error } = useSelector(
    (state) => state.admin
  );
  const [processingId, setProcessingId] = useState(null);

  // Fetch pending guides on mount
  useEffect(() => {
    dispatch(fetchPendingGuides());
  }, [dispatch]);

  const handleApprove = (id) => {
    setProcessingId(id);
    dispatch(approveGuideAsync(id))
      .unwrap()
      .finally(() => setProcessingId(null));
  };

  const handleReject = (id) => {
    if (!window.confirm("Are you sure you want to reject this application?"))
      return;
    setProcessingId(id);
    dispatch(rejectGuideAsync(id))
      .unwrap()
      .finally(() => setProcessingId(null));
  };

  if (guidesLoading) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-500 font-medium">Error: {error}</p>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Pending Guide Applications</h2>

      {pendingGuides.length === 0 ? (
        <p className="text-gray-500">No pending guide applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Languages</th>
                <th className="border p-2">Experience</th>
                <th className="border p-2">Region</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingGuides.map((guide) => (
                <tr key={guide._id}>
                  <td className="border p-2">
                    {guide.user?.fullName || "N/A"}
                  </td>
                  <td className="border p-2">{guide.mobile}</td>
                  <td className="border p-2">{guide.languages.join(", ")}</td>
                  <td className="border p-2">{guide.experience} years</td>
                  <td className="border p-2">{guide.region}</td>
                  <td className="border p-2 space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(guide._id)}
                      disabled={processingId === guide._id}
                    >
                      {processingId === guide._id ? "Processing..." : "Approve"}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleReject(guide._id)}
                      disabled={processingId === guide._id}
                    >
                      {processingId === guide._id ? "Processing..." : "Reject"}
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

export default GuideApplication;
