import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(AuthContext); // Function to handle logout
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  }, [logout, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
