import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuideById,
  getGuideByUserId,
  updateGuide,
} from "../features/guide/guideSlice";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Button from "../components/Button";

const GuideEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // correct slice
  const { selectedGuide, loading, error } = useSelector((state) => state.guide);
  const authUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    mobile: "",
    languages: "",
    experience: "",
    region: "",
    verified: false,
  });

  // Fetch guide when page loads
  useEffect(() => {
    if (!id) return;
    const isOwnProfile = id === (authUser?._id || authUser?.id);
    if (isOwnProfile) {
      // route param is a userId (guide editing self)
      dispatch(getGuideByUserId(id));
    } else {
      // route param is a guideId (e.g., admin editing)
      dispatch(getGuideById(id));
    }
  }, [dispatch, id, authUser]);

  // Prefill with existing guide data
  useEffect(() => {
    if (selectedGuide) {
      setFormData({
        mobile: selectedGuide.mobile ?? "",
        languages: Array.isArray(selectedGuide.languages)
          ? selectedGuide.languages.join(", ")
          : "",
        experience: selectedGuide.experience ?? "",
        region: selectedGuide.region ?? "",
        verified: selectedGuide.verified ?? false,
      });
    }
  }, [selectedGuide]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGuide?._id) return;

    // Build update object with only changed fields
    const updatedData = {};
    if (formData.mobile !== selectedGuide?.mobile) {
      updatedData.mobile = formData.mobile;
    }
    if (formData.languages !== selectedGuide?.languages?.join(", ")) {
      updatedData.languages = formData.languages
        .split(",")
        .map((lang) => lang.trim())
        .filter(Boolean);
    }
    if (formData.experience !== selectedGuide?.experience) {
      updatedData.experience = formData.experience;
    }
    if (formData.region !== selectedGuide?.region) {
      updatedData.region = formData.region;
    }
    if (formData.verified !== selectedGuide?.verified) {
      updatedData.verified = formData.verified;
    }

    if (Object.keys(updatedData).length === 0) {
      alert("No changes made.");
      return;
    }

    // IMPORTANT -> update by the real guide _id
    dispatch(updateGuide({ id: selectedGuide._id, guideData: updatedData }))
      .unwrap()
      .then(() => {
        alert("Changes saved successfully!"); // feedback
        navigate("/dashboard/guide"); //  go to dashboard
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  if (loading && !selectedGuide) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-500 font-medium">Error: {error}</p>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Guide</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Languages (comma separated)
          </label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min="0"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Region</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="verified"
            checked={formData.verified}
            onChange={handleChange}
          />
          <label className="font-medium">Verified</label>
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="submit">Save Changes</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/guides/${id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GuideEditForm;
