import Homestay from "../models/Homestay.js";
import HomestayBooking from "../models/HomeStayBooking.js";
import User from "../models/User.js";

const homestayController = {
  // Get all homestays
  getAllHomestays: async (req, res) => {
    try {
      let homestays;
      if (req.user && req.user.role === "admin") {
        homestays = await Homestay.find().populate("owner", "fullName email role");
      } else {
        homestays = await Homestay.find({ status: "approved" }).populate("owner", "fullName email");
      }
      res.json(homestays);
    } catch (error) {
      console.error("Error fetching homestays:", error);
      res.status(500).json({ error: "Failed to fetch homestays" });
    }
  },

  // Get single homestay by ID
  getHomestayById: async (req, res) => {
    try {
      const { id } = req.params;
      const homestay = await Homestay.findById(id).populate("owner", "fullName email");
      if (!homestay) return res.status(404).json({ error: "Homestay not found" });
      res.json(homestay);
    } catch (error) {
      console.error("Error fetching homestay by ID:", error);
      res.status(500).json({ error: "Failed to fetch homestay" });
    }
  },

  // Create new homestay
  createHomestay: async (req, res) => {
    try {
      const { title, location, description, price } = req.body;

      if (!(req.user.role === "user" || req.user.role === "owner")) {
        return res.status(403).json({ error: "Only users or owners can create a homestay" });
      }

      if (!title || !location || !description || !price) {
        return res.status(400).json({ error: "All fields are required" });
      }

      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        imageUrls = req.files.map(
          (file) => `${req.protocol}://${req.get("host")}/uploads/homestays/${file.filename}`
        );
      }

      const newHomestay = new Homestay({
        title,
        location,
        description,
        price,
        images: imageUrls,
        status: "pending",
        owner: req.user._id,
      });

      await newHomestay.save();
      await User.findByIdAndUpdate(req.user._id, { isHomestayOwner: true });

      res.status(201).json({
        message: "Homestay submitted for admin approval",
        data: newHomestay,
      });
    } catch (error) {
      console.error("Error creating homestay:", error);
      res.status(500).json({ error: "Failed to create homestay" });
    }
  },

  // Get owner-specific homestays
  getOwnerHomestays: async (req, res) => {
    try {
      const homestays = await Homestay.find({ owner: req.user._id });
      res.json(homestays);
    } catch (error) {
      console.error("Error fetching owner homestays:", error);
      res.status(500).json({ message: "Server error fetching owner homestays" });
    }
  },

  // Admin gets all pending homestays
  getPendingHomestays: async (req, res) => {
    try {
      const pending = await Homestay.find({ status: "pending" }).populate("owner", "fullName email");
      res.json(pending);
    } catch (error) {
      console.error("Error fetching pending homestays:", error);
      res.status(500).json({ error: "Failed to fetch pending homestays" });
    }
  },

  // Admin approves a homestay
  approveHomestay: async (req, res) => {
    try {
      const { id } = req.params;
      const homestay = await Homestay.findById(id);
      if (!homestay) return res.status(404).json({ error: "Homestay not found" });

      homestay.status = "approved";
      await homestay.save();

      res.json({ message: "Homestay approved successfully", homestay });
    } catch (error) {
      console.error("Error approving homestay:", error);
      res.status(500).json({ error: "Failed to approve homestay" });
    }
  },

  // Update homestay
  updateHomestay: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const homestay = await Homestay.findById(id);
      if (!homestay) return res.status(404).json({ error: "Homestay not found" });

      if (updates.status && req.user.role !== "admin") {
        return res.status(403).json({ error: "Only admin can approve/reject homestays" });
      }

      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(
          (file) => `${req.protocol}://${req.get("host")}/uploads/homestays/${file.filename}`
        );
        updates.images = [...homestay.images, ...newImages];
      }

      const updatedHomestay = await Homestay.findByIdAndUpdate(id, updates, { new: true });
      res.json(updatedHomestay);
    } catch (error) {
      console.error("Error updating homestay:", error);
      res.status(500).json({ error: "Failed to update homestay" });
    }
  },

  // Delete homestay
  deleteHomestay: async (req, res) => {
    try {
      const { id } = req.params;
      const homestay = await Homestay.findByIdAndDelete(id);
      if (!homestay) return res.status(404).json({ error: "Homestay not found" });

      res.json({ message: "Homestay deleted successfully" });
    } catch (error) {
      console.error("Error deleting homestay:", error);
      res.status(500).json({ error: "Failed to delete homestay" });
    }
  },

  // Book homestay
  bookHomestay: async (req, res) => {
    try {
      const { startDate, endDate, guests, notes } = req.body;
      const { id } = req.params;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: "Start and end dates are required" });
      }

      const homestay = await Homestay.findById(id);
      if (!homestay || homestay.status !== "approved") {
        return res.status(404).json({ error: "Homestay not found or not approved" });
      }

      const booking = new HomestayBooking({
        homestay: homestay._id,
        user: req.user._id,
        owner: homestay.owner,
        startDate,
        endDate,
        guests: guests || 1,
        notes,
        status: "pending",
      });

      await booking.save();
      res.status(201).json({ message: "Homestay booked successfully", booking });
    } catch (error) {
      console.error("Error booking homestay:", error);
      res.status(500).json({ error: "Failed to book homestay" });
    }
  },

  // Get bookings for homestay owner
  getBookingsForOwner: async (req, res) => {
    try {
      const bookings = await HomestayBooking.find({ owner: req.user._id })
        .populate("user", "fullName email")
        .populate("homestay", "title location price")
        .sort({ createdAt: -1 });

      res.json({ bookings });
    } catch (error) {
      console.error("Error fetching bookings for owner:", error);
      res.status(500).json({ error: "Failed to fetch owner bookings" });
    }
  },

  // Get my bookings (user)
  getMyHomestayBookings: async (req, res) => {
    try {
      const bookings = await HomestayBooking.find({ user: req.user._id })
        .populate("homestay", "title location price images")
        .sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  },

  // Update booking status
  updateBookingStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const { bookingId } = req.params;

      if (!["pending", "accepted", "rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      const booking = await HomestayBooking.findById(bookingId).populate("homestay", "owner");
      if (!booking) return res.status(404).json({ error: "Booking not found" });

      if (req.user.role !== "admin" && booking.homestay.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }

      booking.status = status;
      await booking.save();
      res.json({ message: "Booking status updated", booking });
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ error: "Failed to update booking status" });
    }
  },

  // Delete/cancel booking
  deleteHomestayBooking: async (req, res) => {
    try {
      const { bookingId } = req.params;

      const booking = await HomestayBooking.findById(bookingId);
      if (!booking) return res.status(404).json({ error: "Booking not found" });

      if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized to cancel this booking" });
      }

      booking.status = "cancelled";
      await booking.save();
      res.json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      res.status(500).json({ error: "Failed to cancel booking" });
    }
  },

  // Get available homestays
  getAvailableHomestays: async (req, res) => {
    try {
      const homestays = await Homestay.find({ status: "approved" });
      res.json({ success: true, homestays });
    } catch (error) {
      console.error("Error fetching available homestays:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

export default homestayController;
