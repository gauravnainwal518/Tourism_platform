import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/guides';

// Function to create a new guide
const createGuide = async (guideData, token) => {
  try {
    const response = await axios.post(`${'http://localhost:5000/api/guides'}/create`, guideData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create guide');
  }
};

// Function to get all guides
const getAllGuides = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/api/guides', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch guides');
  }
};

// Function to get a single guide by ID


// Function to update a guide


// Function to delete a guide

// Exporting all functions as named exports and also as a default export
const guideService = {
  createGuide,
  getAllGuides,
 
};

export default guideService;
export {
  createGuide,
  getAllGuides,
  
};