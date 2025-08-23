import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { registerUserOrGuide } from "../../../features/auth/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
    mobile: "",
    languages: "",
    experience: "",
    region: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
      ...(role === "user"
        ? { mobile: "", languages: "", experience: "", region: "" }
        : {}),
    }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return setError("Full Name is required.");
    if (!formData.email.trim()) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return setError("Please enter a valid email address.");
    if (!formData.password.trim()) return setError("Password is required.");

    if (formData.role === "guide") {
      if (!formData.mobile.trim())
        return setError("Mobile number is required for guides.");
      if (!formData.languages.trim())
        return setError("Please enter at least one language.");
      if (
        formData.experience === "" ||
        isNaN(formData.experience) ||
        formData.experience < 0
      )
        return setError("Please enter valid experience in years.");
      if (!formData.region.trim())
        return setError("Region is required for guides.");
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Ensure languages is always a safe array
      const languagesArray =
        formData.role === "guide" && formData.languages?.trim()
          ? formData.languages.split(",").map((l) => l.trim())
          : [];

      const resultAction = await dispatch(
        registerUserOrGuide({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: formData.role,
          mobile: formData.mobile,
          languages: languagesArray,
          experience:
            formData.experience !== "" ? Number(formData.experience) : 0,
          region: formData.region,
        })
      );

      if (registerUserOrGuide.fulfilled.match(resultAction)) {
        if (formData.role === "guide") {
          setSuccess(
            "Registration successful! Your guide account is pending admin approval."
          );
        } else {
          setSuccess("Registration successful! Please login.");
        }

        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: "user",
          mobile: "",
          languages: "",
          experience: "",
          region: "",
        });
      } else {
        setError(
          resultAction.payload ||
            resultAction.error?.message ||
            "Registration failed"
        );
      }
    } catch (err) {
      setError(err.message || "Server error during registration");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-green-200"
    >
      {/* Role Selection Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          type="button"
          className={`px-4 py-2 rounded ${
            formData.role === "user"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleRoleChange("user")}
          disabled={loading}
        >
          Register as User
        </Button>
        <Button
          type="button"
          className={`px-4 py-2 rounded ${
            formData.role === "guide"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleRoleChange("guide")}
          disabled={loading}
        >
          Register as Guide
        </Button>
      </div>

      {/* Common Fields */}
      <div>
        <label className="block text-sm font-medium text-[#2f5d3f]">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-white border border-[#cfe1d4] p-2 focus:ring-2 focus:ring-[#3b7d57]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2f5d3f]">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-white border border-[#cfe1d4] p-2 focus:ring-2 focus:ring-[#3b7d57]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2f5d3f]">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Create a secure password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-white border border-[#cfe1d4] p-2 focus:ring-2 focus:ring-[#3b7d57]"
        />
      </div>

      {/* Guide Fields */}
      {formData.role === "guide" && (
        <>
          <div>
            <label className="block text-sm font-medium text-[#2f5d3f]">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-white border border-[#cfe1d4] p-2 focus:ring-2 focus:ring-[#3b7d57]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2f5d3f]">
              Languages Spoken
            </label>
            <input
              type="text"
              name="languages"
              placeholder="e.g., English, Hindi, Garhwali"
              value={formData.languages}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-white border border-[#cfe1d4] p-2 focus:ring-2 focus:ring-[#3b7d57]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2f5d3f]">
              Experience (in years)
            </label>
            <input
              type="number"
              name="experience"
              placeholder="e.g., 3"
              min={0}
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-white border border-[#cfe1d4] p-2 focus:ring-2 focus:ring-[#3b7d57]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2f5d3f]">
              Region / Operating Area
            </label>
            <input
              type="text"
              name="region"
              placeholder="e.g., Nainital, Mussoorie"
              value={formData.region}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-white border border-[#cfe1d4] p-2 focus:ring-2 focus:ring-[#3b7d57]"
            />
          </div>
        </>
      )}

      {/* Messages */}
      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-center font-semibold">{success}</p>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>

      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-700 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
