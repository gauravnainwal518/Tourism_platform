import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { loginAdmin } from "../features/admin/adminSlice";
import { getToken, removeToken, isTokenExpired } from "../utils/token";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use "user" consistently for admin info
  const { user, loginLoading, error } = useSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in and token is valid
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired()) {
      navigate("/dashboard/admin");
    } else {
      removeToken();
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        loginAdmin({ email: email.trim(), password })
      );

      if (loginAdmin.fulfilled.match(resultAction)) {
        const { token, user: adminData } = resultAction.payload;

        // Token is already set in thunk
        localStorage.setItem("user", JSON.stringify(adminData));

        navigate("/dashboard/admin");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            required
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            required
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <Button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </Button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
