import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://tourism-platform.onrender.com/api/homestays';

//Function to create homestay
export const createHomestay = async (homestayData, token) => {
  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const response = await axios.post(`${API_URL}/create`, homestayData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message || 
      'Failed to create homestay';
    throw new Error(errorMessage);
  }
};


// Function to get all homestays
export const getAllHomestays = async (token) => {
  try {
    const response = await axios.get('https://tourism-platform.onrender.com/api/homestays', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch homestays');
  }
};

// Function to get a single homestay by ID


// Function to update a homestay


// Function to delete a homestay


// Default export as an object containing all functions
const homestayService = {
  createHomestay,
  getAllHomestays,
  
};

export default homestayService;
