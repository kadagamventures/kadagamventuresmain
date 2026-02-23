const mongoose = require("mongoose");

const pricingPlanSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true },
    priceFrom: { type: Number, required: true },
    priceTo: { type: Number, required: true },
    duration: { type: String },
    features: { type: [String], required: true },
    isPopular: { type: Boolean, default: false },
  },
  { _id: true }
);

const videoProductionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Video Production",
    },

    slug: {
      type: String,
      default: "video-production",
      unique: true,
      immutable: true,
    },

    description: {
      type: String,
      required: true,
    },

    platforms: {
      type: [String],
      default: [
        "Corporate Videos",
        "Promotional Videos",
        "Social Media Reels",
        "Explainer Videos",
      ],
    },

    pricingPlans: {
      type: [pricingPlanSchema],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VideoProduction",
  videoProductionSchema
);
