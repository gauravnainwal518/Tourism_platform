const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");

// Route for creating a booking
router.post("/", createBooking);

module.exports = router;
