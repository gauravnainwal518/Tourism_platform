import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { loginUserOrGuide } from "../../../features/auth/authSlice";
import {
  getToken,
  setToken,
  isTokenExpired,
  removeToken,
} from "../../../utils/token";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user,
    loading,
    error: reduxError,
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // On mount: check token from localStorage and redirect
  useEffect(() => {
    const token = getToken();
    const storedUserRaw = localStorage.getItem("user");
    let storedUser = null;

    try {
      storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("user");
    }

    if (token && !isTokenExpired() && storedUser) {
      if (storedUser.role === "user") navigate("/dashboard/user");
      else if (storedUser.role === "guide") navigate("/dashboard/guide");
      else if (storedUser.role === "owner") navigate("/dashboard/owner"); //Owner redirect
    } else {
      removeToken();
      localStorage.removeItem("user");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resultAction = await dispatch(
        loginUserOrGuide({
          email: formData.email.trim(),
          password: formData.password,
        })
      );

      if (loginUserOrGuide.fulfilled.match(resultAction)) {
        const { user: loggedUser, token } = resultAction.payload;

        // Save token & user info
        if (token) setToken(token);
        localStorage.setItem("user", JSON.stringify(loggedUser));

        // Redirect based on role
        if (loggedUser.role === "user") navigate("/dashboard/user");
        else if (loggedUser.role === "guide") navigate("/dashboard/guide");
        else if (loggedUser.role === "owner") navigate("/dashboard/owner");
        else setError("Admins cannot login from this page.");
      } else {
        // Handle backend message for pending guide approval
        if (
          resultAction.payload &&
          resultAction.payload.message ===
            "Your guide account is pending admin approval. Please wait."
        ) {
          setError(resultAction.payload.message);
        } else {
          setError(
            resultAction.payload ||
              resultAction.error?.message ||
              "Invalid credentials"
          );
        }
      }
    } catch (err) {
      setError(err.message || "Server error during login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(error || reduxError) && (
        <p className="text-red-600 text-sm text-center font-semibold">
          {error || reduxError}
        </p>
      )}

      <div>
        <label
          className="block mb-1 font-semibold text-green-700"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded-md bg-green-50 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          className="block mb-1 font-semibold text-green-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded-md bg-green-50 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-sm mt-4 text-center text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-green-700 font-semibold hover:underline"
        >
          Register here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
