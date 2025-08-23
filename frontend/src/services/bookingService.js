import { API } from "../utils/apiConfig";

// fetchWithAuth ensures token is sent
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token"); // JWT from login
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => null);

  return { ok: res.ok, data };
};

// Fetch both guide + homestay bookings for a user
export const getUserBookings = async () => {
  const endpoints = [
    { url: `${API.GUIDES}/bookings/me`, type: "guide" },
    { url: `${API.HOMESTAYS}/bookings/me`, type: "homestay" },
  ];

  const responses = await Promise.all(
    endpoints.map(async (e) => {
      try {
        const res = await fetchWithAuth(e.url);
        if (!res.ok || !res.data) return [];
        return res.data.map((b) => ({ ...b, type: e.type }));
      } catch {
        return [];
      }
    })
  );

  return responses.flat();
};

// Create a booking (guide or homestay)
export const createBooking = async (type, id, bookingData) => {
  const endpoint =
    type === "guide"
      ? `${API.GUIDES}/${id}/book`
      : `${API.HOMESTAYS}/${id}/book`;

  const res = await fetchWithAuth(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    console.error("Booking creation failed:", res.data);
    throw new Error(res.data?.message || "Failed to create booking");
  }

  return { ...res.data, type };
};

// Fetch bookings for the logged-in guide
export const getGuideBookings = async () => {
  const res = await fetchWithAuth(`${API.GUIDES}/bookings/for-me`);
  if (!res.ok) throw new Error("Failed to fetch guide bookings");
  return res.data;
};

// Cancel/Delete booking (works for both types)
export const deleteBooking = async (type, bookingId) => {
  const endpoint =
    type === "guide"
      ? `${API.GUIDES}/bookings/${bookingId}`
      : `${API.HOMESTAYS}/bookings/${bookingId}`;

  const res = await fetchWithAuth(endpoint, { method: "DELETE" });

  if (!res.ok) {
    throw new Error(res.data?.message || "Failed to delete booking");
  }

  return res.data;
};

// Convenient wrapper for cancelling a booking
export const cancelBooking = async (booking) => {
  return deleteBooking(booking.type, booking._id);
};

// Update booking status (for guide/admin)
export const updateBookingStatus = async (bookingId, status) => {
  const res = await fetchWithAuth(
    `${API.GUIDES}/bookings/${bookingId}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update booking status");
  }

  return res.data;
};

const bookingService = {
  getUserBookings,
  createBooking,
  getGuideBookings,
  deleteBooking,
  cancelBooking, 
  updateBookingStatus,
};

export default bookingService;
