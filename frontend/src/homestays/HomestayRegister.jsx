import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewHomestay } from "../features/homestays/homestaySlice";
import Button from "../components/Button";
import Loader from "../components/Loader";

const HomestayRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.homestays);
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login first to register a homestay!");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + selectedImages.length > 10) {
      alert("You can upload up to 10 images only.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Allow only user or owner -> no guide or admin
    if (user?.role !== "user" && user?.role !== "owner") {
      alert("Only normal users or owners can register a homestay.");
      return;
    }

    if (formData.description.length < 20) {
      alert("Description must be at least 20 characters long.");
      return;
    }

    if (!formData.title || !formData.location || !formData.price) {
      alert("Please fill in all fields.");
      return;
    }

    if (selectedImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("price", formData.price);
    selectedImages.forEach((img) => data.append("photos", img.file));

    try {
      await dispatch(createNewHomestay({ data, token })).unwrap();
      alert("Your homestay has been submitted for admin approval!");
      setFormData({ title: "", description: "", location: "", price: "" });
      setSelectedImages([]);
    } catch (err) {
      console.error("Failed to submit homestay:", err);
      alert("Failed to submit homestay. Please try again.");
    }
  };

  // If logged in but role is not user/owner, block access
  if (isAuthenticated && user?.role !== "user" && user?.role !== "owner") {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-700">
          Only normal users or owners can register a homestay. Guides and admins
          are not allowed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Register a New Homestay
      </h2>

      {loading && <Loader />}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300 bg-gray-50"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 rounded border border-gray-300 bg-gray-50"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300 bg-gray-50"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 text-gray-700">
            Price per Night (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300 bg-gray-50"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1 text-gray-700">Images (max 10)</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="w-full p-2 rounded border border-gray-300 bg-gray-50"
          />

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {selectedImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit for Admin Approval"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomestayRegistration;
