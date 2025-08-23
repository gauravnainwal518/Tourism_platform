const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mobile: { type: String, required: true },
    languages: { type: [String], required: true },
    experience: { type: Number, required: true },
    region: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guide", guideSchema);
