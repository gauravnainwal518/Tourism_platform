import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bookingService from "../services/bookingService";

//Read this code carefully how i handle it because it is bit complex - it take lot of time in debugging
const BookingWindow = () => {
  const location = useLocation(); // Access location for state data
  const homestay = location.state?.homestay; // Get homestay details from state

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    numberOfRooms: 1,
    homestayId: homestay?._id || "", // Pre-fill homestay ID
  });

  const [message, setMessage] = useState(""); // State for success or error message

  useEffect(() => {
    if (homestay) {
      setFormData((prevData) => ({
        ...prevData,
        homestayId: homestay._id,
      }));
    }
  }, [homestay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      phoneNumber,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      numberOfRooms,
      homestayId,
    } = formData;

    try {
      const bookingData = await bookingService.createBooking({
        fullName,
        email,
        phoneNumber,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        numberOfRooms,
        homestayId,
      });
      setMessage(`Booking Successful! Booking ID: ${bookingData.id}`);
    } catch (error) {
      setMessage("Error creating booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Booking for {homestay?.name || "Homestay"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Check-in Date</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Check-out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Number of Guests
            </label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
              min="1"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Number of Rooms</label>
            <input
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              required
              min="1"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
          >
            Book Now
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default BookingWindow;
