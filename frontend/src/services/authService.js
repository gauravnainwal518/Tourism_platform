
import axios from 'axios';

//setting base api url
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';





const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw error;  // Propagate error for further handling
  }
};


const register = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response ? error.response.data : error.message);
    throw error;  // Propagate error for further handling
  }
};

const authService = {
  login,
  register,
};

export default authService;
