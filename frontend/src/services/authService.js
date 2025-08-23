import axios from "axios";
import { API } from "../utils/apiConfig";

// LOGIN-> User or Guide
const loginUserOrGuide = async (email, password) => {
  try {
    const response = await axios.post(`${API.AUTH}/login`, { email, password });
    return response.data; // { success, token, user }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// REGISTER-> User or Guide
const registerUserOrGuide = async (userData) => {
  try {
    const response = await axios.post(`${API.AUTH}/register`, userData);
    return response.data; // { success, token, user }
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export default {
  loginUserOrGuide,
  registerUserOrGuide,
};
