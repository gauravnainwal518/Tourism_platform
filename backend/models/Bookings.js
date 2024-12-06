const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
    },
    homestayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Homestay",  
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Booking", bookingSchema);