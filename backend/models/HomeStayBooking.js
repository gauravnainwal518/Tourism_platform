const mongoose = require("mongoose");

const homestayBookingSchema = new mongoose.Schema(
  {
    homestay: { type: mongoose.Schema.Types.ObjectId, ref: "Homestay", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // the tourist/guest
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // homestay owner
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    guests: { type: Number, default: 1 },
    status: { type: String, enum: ["pending", "accepted", "rejected","cancelled"], default: "pending" },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomestayBooking", homestayBookingSchema);
