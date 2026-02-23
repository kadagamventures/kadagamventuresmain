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

const digitalMarketingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Digital Marketing",
    },

    slug: {
      type: String,
      default: "digital-marketing",
      unique: true,
      immutable: true,
    },

    description: {
      type: String,
      required: true,
    },

    platforms: {
      type: [String],
      default: ["SEO", "Social Media", "Google Ads", "Email Marketing"],
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
  "DigitalMarketing",
  digitalMarketingSchema
);
