const mongoose = require("mongoose");

const pricingPlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },

    priceFrom: {
      type: Number,
      required: true,
    },

    priceTo: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
    },

    features: {
      type: [String],
      required: true,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true } // ✅ IMPORTANT for update/delete
);

const mobileAppDevelopmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Mobile App Development",
    },

    slug: {
      type: String,
      default: "mobile-app-development",
      unique: true,
      immutable: true, // ❌ cannot be changed
    },

    description: {
      type: String,
      required: true,
    },

    platforms: {
      type: [String],
      default: ["Android", "iOS"],
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
  "MobileAppDevelopment",
  mobileAppDevelopmentSchema
);
