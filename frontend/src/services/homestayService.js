
import axios from "axios";
import { API } from "../utils/apiConfig";
import { getToken } from "../utils/token";

// Helper: headers with token, supports FormData
const headersWithToken = (isFormData = false) => {
  const token = getToken();
  if (!token) throw new Error("Authentication token is missing.");
  return {
    Authorization: `Bearer ${token}`,
    ...(isFormData && { "Content-Type": "multipart/form-data" }),
  };
};

// Create a new homestay (submitted for admin approval)
export const createHomestay = async (formData, token) => {
  if (!token) throw new Error("Authentication token is missing.");
  const response = await axios.post(`${API.HOMESTAYS}/create`, formData, {
    headers: headersWithToken(true),
  });
  return response.data;
};

// Fetch all homestays (public)
export const getAllHomestays = async () => {
  // No token or authorization needed
  const response = await axios.get(API.HOMESTAYS);
  return response.data || [];
};


// Fetch available homestays (only approved)
export const getAvailableHomestays = async () => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`${API.HOMESTAYS}/available`, { headers });
  return response.data;
};


// Fetch a single homestay by ID
export const getHomestayById = async (id, token) => {
  if (!token) throw new Error("Authentication token is missing.");
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API.HOMESTAYS}/${id}`, { headers });
  return response.data;
};



// Update homestay (admin approve/reject or owner edits)
export const updateHomestay = async (id, homestayData) => {
  const response = await axios.put(`${API.HOMESTAYS}/${id}`, homestayData, {
    headers: headersWithToken(homestayData instanceof FormData),
  });
  return response.data;
};

// Delete a homestay
export const deleteHomestay = async (id) => {
  const response = await axios.delete(`${API.HOMESTAYS}/${id}`, {
    headers: headersWithToken(),
  });
  return response.data;
};

// Book a homestay
export const bookHomestay = async (id, bookingData) => {
  const response = await axios.post(`${API.HOMESTAYS}/${id}/book`, bookingData, {
    headers: headersWithToken(),
  });
  return response.data;
};


// Fetch bookings for homestays owned by the logged-in user (owner)
export const getOwnerHomestayBookings = async () => {
  const token = getToken();
  if (!token) throw new Error("Authentication token is missing.");

  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API.HOMESTAYS}/bookings/for-me`, { headers });
   //console.log("Owner bookings API response:", response.data); 
  return response.data;
};


// Update status of a homestay booking (accept/reject)
export const updateBookingStatus = async (bookingId, status) => {
  const token = getToken();
  if (!token) throw new Error("Authentication token is missing.");

  const response = await axios.patch(
    `${API.HOMESTAYS}/bookings/${bookingId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
  );

  return response.data;
};

// Fetch homestays owned by the logged-in user (owner)
export const getOwnerHomestays = async () => {
  const token = getToken();
  if (!token) throw new Error("Authentication token is missing.");

  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API.HOMESTAYS}/for-me`, { headers });
  return response.data; 
};




// Default export
const homestayService = {
  createHomestay,
  getAllHomestays,
  getAvailableHomestays,
  getHomestayById,
  updateHomestay,
  deleteHomestay,
  bookHomestay,
  getOwnerHomestayBookings,
  updateBookingStatus,
  getOwnerHomestays 
};

export default homestayService;
