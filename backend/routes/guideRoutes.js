import express from "express";
import {
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
} from "../controllers/guideController.js";

import {
  protect,
  adminOnly,
  guideOrAdmin,
  guideOnly,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all verified guides
router.get("/", getGuides);

// Get guide by ID
router.get("/:id", getGuideById);

// Get guide by User ID (for logged-in guide)
router.get("/by-user/:userId", protect, getGuideByUserId); 

// Get all pending guides (admin only)
router.get("/pending/list", protect, adminOnly, getPendingGuides);

// Guide CRUD
router.post("/", protect, createGuide);
router.put("/:id", protect, updateGuide);
router.delete("/:id", protect, deleteGuide);

// User books a guide
router.post("/:id/book", protect, bookGuide);

// User gets their own bookings
router.get("/bookings/me", protect, getMyGuideBookings);

// User deletes/cancels their booking
router.delete("/bookings/:bookingId", protect, deleteGuideBooking);

// Guide or Admin updates booking status
router.patch("/bookings/:bookingId/status", protect, guideOrAdmin, updateBookingStatus);

// Guide gets their own bookings
router.get("/bookings/for-me", protect, guideOnly, getGuideBookings);

export default router;
