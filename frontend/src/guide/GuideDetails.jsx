import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGuideByUserId } from "../features/guide/guideSlice";
import Loader from "../components/Loader";

const GuideDetails = () => {
  const { id } = useParams(); // For admin/public viewing by guide _id (optional)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedGuide, loading, error } = useSelector((state) => state.guide);
  const user = useSelector((state) => state.auth.user);

  // Determine which ID to fetch
  const guideIdToFetch = id || user?.guideId || user?._id;
  const isGuideUser = user?.role === "guide" && !id; // logged-in guide

  useEffect(() => {
    if (!guideIdToFetch) return;

    if (isGuideUser) {
      dispatch(getGuideByUserId(user._id))
        .unwrap()
        .then((data) => console.log("Guide fetched by user ID:", data))
        .catch((err) => console.error("Error fetching guide by user ID:", err));
    } else {
      dispatch(getGuideByUserId(guideIdToFetch))
        .unwrap()
        .then((data) => console.log("Guide fetched by guide ID:", data))
        .catch((err) =>
          console.error("Error fetching guide by guide ID:", err)
        );
    }
  }, [guideIdToFetch, isGuideUser, user, dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!selectedGuide && !loading)
    return (
      <p className="text-gray-600 text-center mt-6">
        Guide data is not available.
      </p>
    );

  const guideUser = selectedGuide?.user || (user?.role === "guide" ? user : {});
  const mobile = selectedGuide?.mobile || "N/A";
  const languages = selectedGuide?.languages || [];
  const experience = selectedGuide?.experience ?? "N/A";
  const region = selectedGuide?.region || "N/A";
  const verified = selectedGuide?.verified ?? false;

  // Fix here: use fullName instead of name
  const displayName = guideUser?.fullName || "N/A";

  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 w-full max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm"
        >
          ← Back
        </button>

        {/* Guide Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-3xl font-bold shadow-inner">
            {displayName !== "N/A" ? displayName[0].toUpperCase() : "G"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{displayName}</h1>
            <p className="text-gray-500 mt-1">
              {verified ? "✅ Verified Guide" : "❌ Not Verified"}
            </p>
            <p className="text-gray-600 mt-1">
              Email: {guideUser?.email || "N/A"}
            </p>
          </div>
        </div>

        {/* Guide Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <p>
            <span className="font-semibold">Mobile:</span> {mobile}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {languages.length > 0 ? languages.join(", ") : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {experience !== "N/A" ? `${experience} years` : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {region}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
