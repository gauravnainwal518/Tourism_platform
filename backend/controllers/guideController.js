const Guide = require("../models/Guide");
const GuideBooking = require("../models/GuideBookings");

// GUIDE CRUD 

//create guide
const createGuide = async (req, res) => {
  try {
    const { mobile, languages, experience, region } = req.body;

    if (!mobile || !languages || !experience || !region) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const guide = new Guide({
      user: req.user._id,
      mobile,
      languages,
      experience,
      region,
    });

    await guide.save();
    res.status(201).json({ message: "Guide application submitted", guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all verified guides
const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ verified: true }).populate("user", "fullName email");
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single guide by id 
const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id).populate("user", "fullName email");
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get guide by User ID (for profile)
const getGuideByUserId = async (req, res) => {
  try {
    const guide = await Guide.findOne({ user: req.params.userId }).populate("user", "fullName email");
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update guide (admin verify or owner edit)

const updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    if (req.user.role !== "admin" && guide.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(guide, req.body);
    await guide.save();

    res.json({ message: "Guide updated successfully", guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete guide
const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    if (req.user.role !== "admin" && guide.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await guide.deleteOne();
    res.json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get pending guides (admin approval)
const getPendingGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ verified: false }).populate("user", "fullName email");
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  BOOKING FUNCTIONS 
//Book a guide 
const bookGuide = async (req, res) => {
  try {
    const { date, notes } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Booking date is required" });
    }

    const guide = await Guide.findById(req.params.id);
    if (!guide || !guide.verified) {
      return res.status(404).json({ message: "Guide not found or not verified" });
    }

    const booking = new GuideBooking({
      guide: guide._id,
      user: req.user._id,
      date,
      notes,
    });

    await booking.save();
    res.status(201).json({ message: "Guide booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for logged-in user
const getMyGuideBookings = async (req, res) => {
  try {
    const bookings = await GuideBooking.find({ user: req.user._id })
      .populate("guide", "region experience languages")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await GuideBooking.findById(req.params.bookingId).populate("guide", "user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.guide.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for the logged-in guide
const getGuideBookings = async (req, res) => {
  try {
    const guide = await Guide.findOne({ user: req.user._id });
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    const bookings = await GuideBooking.find({ guide: guide._id })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete/cancel a guide booking
const deleteGuideBooking = async (req, res) => {
  try {
    const booking = await GuideBooking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGuide,
  getGuides,
  getGuideById,
  getGuideByUserId,
  updateGuide,
  deleteGuide,
  getPendingGuides,
  bookGuide,
  getMyGuideBookings,
  getGuideBookings,
  updateBookingStatus,
  deleteGuideBooking,
};
