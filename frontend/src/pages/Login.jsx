import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://tourism-platform.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      // Save token and user data to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.user.name,
          email: response.data.user.email,
        })
      );
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white text-gray-900 p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            New user?{" "}
            <a href="/register" className="text-indigo-500 hover:underline">
              Register
            </a>
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/addhomestay")}
            className="w-full py-2 px-4 bg-teal-500 hover:bg-teal-600 rounded text-white font-semibold transition"
          >
            Add New Homestay
          </button>
          <button
            onClick={() => navigate("/addguide")}
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 rounded text-white font-semibold transition"
          >
            Register as Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
//in future add some functionality in login page
