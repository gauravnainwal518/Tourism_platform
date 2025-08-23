const express = require("express");
const { registerUserOrGuide, loginUserOrGuide } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUserOrGuide);
router.post("/login", loginUserOrGuide);

module.exports = router;
