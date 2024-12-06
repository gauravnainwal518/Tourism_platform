import React, { createContext, useState, useContext } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user)); // Store user in local storage
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      throw error; // Re-throw to be handled by the calling component
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await authService.register(name, email, password, role);
      console.log("Registration successful:", response); // Log the response for debugging-remove after some time
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user)); // Store user in local storage
    } catch (error) {
      console.error("Registration error:", error.response || error.message);
      throw error; // Re-throw to be handled by the calling component
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
