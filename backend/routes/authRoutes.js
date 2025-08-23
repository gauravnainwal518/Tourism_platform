import express from "express";
import { registerUserOrGuide, loginUserOrGuide } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUserOrGuide);
router.post("/login", loginUserOrGuide);

export default router;
