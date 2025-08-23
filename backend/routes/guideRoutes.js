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


// STATIC / FIXED ROUTES

// Get all verified guides
router.get("/", getGuides);

// Get guide by User ID (logged-in guide)
router.get("/by-user/:userId", protect, getGuideByUserId);

// Get all pending guides (admin only)
router.get("/pending/list", protect, adminOnly, getPendingGuides);

// User gets their own bookings
router.get("/bookings/me", protect, getMyGuideBookings);

// User deletes/cancels their booking
router.delete("/bookings/:bookingId", protect, deleteGuideBooking);

// Guide or Admin updates booking status
router.patch("/bookings/:bookingId/status", protect, guideOrAdmin, updateBookingStatus);

// Guide gets their own bookings
router.get("/bookings/for-me", protect, guideOnly, getGuideBookings);


// DYNAMIC ROUTES (/:id)


// Get guide by ID
router.get("/:id", getGuideById);

// Create a new guide
router.post("/", protect, createGuide);

// Update guide by ID
router.put("/:id", protect, updateGuide);

// Delete guide by ID
router.delete("/:id", protect, deleteGuide);

// User books a guide
router.post("/:id/book", protect, bookGuide);

export default router;
