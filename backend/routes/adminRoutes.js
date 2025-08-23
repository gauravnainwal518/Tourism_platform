import express from "express";
import { 
  loginAdmin, 
  getDashboardData,
  getPendingGuides,
  getPendingHomestays,
  approveGuide,
  rejectGuide,
  approveHomestay,
  rejectHomestay
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/admin/login
router.post("/login", loginAdmin);

// GET /api/admin/dashboard - Protected & Admin-only
router.get("/dashboard", protect, adminOnly, getDashboardData);

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

export default router;
