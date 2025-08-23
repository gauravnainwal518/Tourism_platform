import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomestayById,
  updateExistingHomestay,
} from "../features/homestays/homestaySlice";
import Loader from "../components/Loader";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

const HomestayEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useAuth();

  const { selectedHomestay, loading, error } = useSelector(
    (state) => state.homestays
  );

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    pricePerNight: "",
    description: "",
    photos: [],
  });

  useEffect(() => {
    if (id && token) {
      dispatch(fetchHomestayById({ id, token }));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    if (selectedHomestay) {
      setFormData({
        title: selectedHomestay.title || selectedHomestay.name || "",
        location: selectedHomestay.location || "",
        pricePerNight: selectedHomestay.pricePerNight || "",
        description: selectedHomestay.description || "",
        photos: [],
      });
    }
  }, [selectedHomestay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photos: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append("title", formData.title);
    updateData.append("location", formData.location);
    updateData.append("pricePerNight", formData.pricePerNight);
    updateData.append("description", formData.description);
    for (let i = 0; i < formData.photos.length; i++) {
      updateData.append("photos", formData.photos[i]);
    }

    try {
      await dispatch(
        updateExistingHomestay({ id, homestayData: updateData, token })
      ).unwrap();
      alert("Homestay updated successfully");
      navigate(`/homestays/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-6">
        {error || "Failed to load homestay"}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Homestay</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold">Price per Night</label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900"
          ></textarea>
        </div>

        {/* Photos */}
        <div>
          <label className="block mb-1 font-semibold">Upload New Photos</label>
          <input
            type="file"
            name="photos"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty if you don’t want to change photos.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomestayEditForm;
