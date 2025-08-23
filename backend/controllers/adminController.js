import jwt from "jsonwebtoken";
import Guide from "../models/Guide.js";
import Homestay from "../models/Homestay.js";
import User from "../models/User.js";

// Admin Login 
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: "Admin",
        email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Dashboard
export const getDashboardData = async (req, res) => {
  try {
    const totalGuides = await Guide.countDocuments();
    const totalHomestays = await Homestay.countDocuments();

    res.json({
      success: true,
      stats: { totalGuides, totalHomestays },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Pending Guides
export const getPendingGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ verified: false }).populate("user", "fullName email");
    res.json({ success: true, guides });
  } catch (error) {
    console.error("Error fetching pending guides:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Approve guide
export const approveGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    if (!guide) return res.status(404).json({ success: false, message: "Guide not found" });
    res.json({ success: true, message: "Guide approved", guide });
  } catch (error) {
    console.error("Error approving guide:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reject guide
export const rejectGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: "Guide not found" });
    res.json({ success: true, message: "Guide rejected", guide });
  } catch (error) {
    console.error("Error rejecting guide:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Pending Homestays
export const getPendingHomestays = async (req, res) => {
  try {
    const homestays = await Homestay.find({ status: "pending" });
    res.json({ success: true, homestays });
  } catch (error) {
    console.error("Error fetching pending homestays:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Approve homestay
export const approveHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!homestay) 
      return res.status(404).json({ success: false, message: "Homestay not found" });

    // Upgrade the homestay owner to role "owner"
    await User.findByIdAndUpdate(homestay.owner, { role: "owner" }, { new: true });

    res.json({ success: true, message: "Homestay approved", homestay });
  } catch (error) {
    console.error("Error approving homestay:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reject homestay
export const rejectHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!homestay) return res.status(404).json({ success: false, message: "Homestay not found" });
    res.json({ success: true, message: "Homestay rejected", homestay });
  } catch (error) {
    console.error("Error rejecting homestay:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
