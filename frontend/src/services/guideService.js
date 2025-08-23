import { fetchWithAuth } from "../utils/fetchWithAuth";
import { API } from "../utils/apiConfig";

// Create a new guide application
export const createGuide = async (guideData) => {
  const res = await fetchWithAuth(`${API.GUIDES}/create`, {
    method: "POST",
    body: JSON.stringify(guideData),
  });
  return res.data || res;
};

// Fetch all guides (verified/public)
export const getAllGuides = async () => {
  const res = await fetchWithAuth(API.GUIDES, { method: "GET" }, false);
  return res.data || [];
};

// Fetch a single guide by ID
//No authorization token needed 
export const getGuideById = async (id) => {
  const res = await fetchWithAuth(`${API.GUIDES}/${id}`, { method: "GET" }, false);
  return res?.data; // always return the guide object
};

// Fetch guide by User ID //useful in guideDashboard view profile means guideDetails and guideEditform
export const getGuideByUserId = async (userId) => {
  const res = await fetchWithAuth(`${API.GUIDES}/by-user/${userId}`, { method: "GET" }, false);
  return res.data || res;
};

// Update a guide (owner edit or admin verify)
export const updateGuide = async (id, guideData) => {
  const res = await fetchWithAuth(`${API.GUIDES}/${id}`, {
    method: "PUT",
    body: JSON.stringify(guideData),
  });
  return res.data || res;
};

// Delete a guide
export const deleteGuide = async (id) => {
  await fetchWithAuth(`${API.GUIDES}/${id}`, { method: "DELETE" });
  return id;
};

// Get all pending guides (admin only)
export const getPendingGuides = async () => {
  const res = await fetchWithAuth(`${API.ADMIN}/pending-guides`, { method: "GET" });
  return res.data || [];
};

export default {
  createGuide,
  getAllGuides,
  getGuideById,
  getGuideByUserId,
  updateGuide,
  deleteGuide,
  getPendingGuides,
};
