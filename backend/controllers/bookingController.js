const mongoose = require("mongoose");
const Booking = require("../models/Bookings");
const Homestay = require("../models/Homestay"); // Ensure the Homestay model is imported

//explain this code carefully how i handle it nested structure. because its bit complex
const createBooking = async (req, res) => {
  // Check for nested structure and extract the payload
  const body = req.body.fullName || req.body; // Handle incorrect nesting

  const {
    fullName,
    email,
    phoneNumber,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    numberOfRooms,
    homestayId,
  } = body;

  console.log("Received request body:", body); // Updated to handle nested structure
  console.log("Received homestayId:", homestayId);

  try {
    if (!mongoose.Types.ObjectId.isValid(homestayId)) {
      console.error("Invalid homestay ID format:", homestayId);
      return res.status(400).json({ message: "Invalid homestay ID format." });
    }

    const homestay = await Homestay.findById(homestayId);
    if (!homestay) {
      return res.status(404).json({ message: "Homestay not found." });
    }

    const newBooking = new Booking({
      fullName,
      email,
      phoneNumber,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      numberOfRooms,
      homestayId,
    });

    await newBooking.save();
    return res.status(201).json({ message: "Booking created successfully", id: newBooking._id });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBooking };
