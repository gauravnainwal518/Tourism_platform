import mongoose from "mongoose";

const guideBookingSchema = new mongoose.Schema(
  {
    guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    notes: { type: String },
    status: { type: String, enum: ["pending", "accepted", "rejected", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("GuideBooking", guideBookingSchema);
