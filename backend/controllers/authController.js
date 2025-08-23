import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Guide from "../models/Guide.js";

// Registration 
export const registerUserOrGuide = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      mobile,
      languages,
      experience,
      region,
    } = req.body;

    // Basic validation
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    // Only allow "user" or "guide"
    if (role !== "user" && role !== "guide") {
      return res.status(400).json({ success: false, message: "Invalid role selection" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // If guide, create guide profile
    if (role === "guide") {
      await Guide.create({
        user: newUser._id,
        mobile: mobile || "",
        languages: Array.isArray(languages) ? languages.map((lang) => lang.trim()) : [],
        experience: experience || 0,
        region: region || "",
        verified: false, // must be approved by admin
      });
    }

    res.status(201).json({
      success: true,
      message:
        role === "guide"
          ? "Registration successful! Your guide account is pending admin approval."
          : "Registration successful! Please login.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login 
export const loginUserOrGuide = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Only check guide approval if user is a guide
    if (user.role === "guide") {
      const guideProfile = await Guide.findOne({ user: user._id }).lean();
      if (!guideProfile || !guideProfile.verified) {
        return res.status(403).json({
          success: false,
          message: "Your guide account is pending admin approval. Please wait.",
        });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
