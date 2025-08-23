const express = require("express");
const { 
  loginAdmin, 
  getDashboardData,
  getPendingGuides,
  getPendingHomestays,
  approveGuide,
  rejectGuide,
  approveHomestay,
  rejectHomestay
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/admin/login
router.post("/login", loginAdmin);

// GET /api/admin/dashboard - Protected & Admin-only
router.get("/dashboard", protect, adminOnly, getDashboardData);

//  New Routes 

// GET pending guides
router.get("/pending-guides", protect, adminOnly, getPendingGuides);

// GET pending homestays
router.get("/pending-homestays", protect, adminOnly, getPendingHomestays);

// PATCH approve/reject guide
router.patch("/approve-guide/:id", protect, adminOnly, approveGuide);
router.patch("/reject-guide/:id", protect, adminOnly, rejectGuide);

// PATCH approve/reject homestay
router.patch("/approve-homestay/:id", protect, adminOnly, approveHomestay);
router.patch("/reject-homestay/:id", protect, adminOnly, rejectHomestay);

module.exports = router;
