import mongoose from "mongoose";

const homestaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Homestay title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 20,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: "You can upload up to 10 images only",
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerName: { type: String },
    ownerEmail: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Homestay", homestaySchema);
