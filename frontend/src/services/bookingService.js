import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "https://tourism-platform.onrender.com/api/bookings";


const createBooking = async (fullName, email, phoneNumber, checkInDate, checkOutDate, numberOfGuests, numberOfRooms, homestayId) => {
  try {
    // Send all the booking data including homestayId to the API
    const response = await axios.post(`${API_URL}`, {
      fullName,
      email,
      phoneNumber,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      numberOfRooms,
      homestayId, // Include the homestayId in the request payload
    });
    return response.data;
  } catch (error) {
    console.error("Booking creation error:", error.response ? error.response.data : error.message);
    throw error; // Propagate error for further handling
  }
};

// Export the booking service
const bookingService = {
  createBooking,
};

export default bookingService;

