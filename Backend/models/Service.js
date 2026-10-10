import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    features: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    icon: {
      type: String,
      required: true,
      trim: true,
    },

    accent: {
      type: String,
      default: "cyan",
      trim: true,
    },

    link: {
      type: String,
      default: "/contact",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;