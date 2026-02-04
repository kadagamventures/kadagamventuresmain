const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    employmentType: { type: String, required: true },
    overview: { type: String, required: true },

    responsibilities: [String],
    skills: [String],

    whatWeOffer: [String],      // ✅ NEW
    howToApply: String,         // ✅ NEW

    positionCount: {
      type: Number,
      required: true,
      min: 1,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
