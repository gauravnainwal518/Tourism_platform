const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect all routes — must be logged in
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // Remove "Bearer "
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // { email, role }

      // If admin, skip DB check
      if (decoded.role === "admin") {
        req.user = { email: decoded.email, role: "admin" };
        return next();
      }

      // Normal users
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      req.user = user; // Now req.user._id exists
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

// Admin-only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ success: false, message: "Access denied: Admins only" });
};

// Guide-only access
const guideOnly = (req, res, next) => {
  if (req.user && req.user.role === "guide") return next();
  return res.status(403).json({ success: false, message: "Access denied: Guides only" });
};

// User-only access
const userOnly = (req, res, next) => {
  if (req.user && req.user.role === "user") return next();
  return res.status(403).json({ success: false, message: "Access denied: Users only" });
};

// Allow either Guide or Admin
const guideOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "guide" || req.user.role === "admin")) return next();
  return res.status(403).json({ success: false, message: "Access denied: Guide or Admin only" });
};

//Allow either Owner or Admin 
const ownerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "owner" || req.user.role === "admin")) return next();
  return res.status(403).json({ success: false, message: "Access denied: owner or Admin only" });
};

//Allow either Owner or Admin 
const userOrOwner = (req, res, next) => {
  if (req.user && (req.user.role === "user" || req.user.role === "owner")) return next();
  return res.status(403).json({ success: false, message: "Access denied: owner or Admin only" });
};



module.exports = {
  protect,
  adminOnly,
  guideOnly,
  userOnly,
  guideOrAdmin,
  ownerOrAdmin,
  userOrOwner
};
