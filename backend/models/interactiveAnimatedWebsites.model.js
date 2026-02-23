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

const interactiveAnimatedWebsitesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Interactive & Animated Websites",
    },

    slug: {
      type: String,
      default: "interactive-animated-websites",
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
        "GSAP Animations",
        "Three.js",
        "Framer Motion",
        "Lottie",
        "WebGL"
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
  "InteractiveAnimatedWebsites",
  interactiveAnimatedWebsitesSchema
);
