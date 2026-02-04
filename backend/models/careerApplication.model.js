const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true,
    },

    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: String,
    gender: String,
    location: String,

    experience: String,
    currentSalary: String,
    expectedSalary: String,
    noticePeriod: String,
    joiningDate: Date,
    joiningTime: String,
    isImmediateJoiner: Boolean,

    resumeKey: String,
  },
  { timestamps: true }
);

/**
 * ✅ Prevent duplicate applications
 * Same email cannot apply twice for the same job
 */
careerApplicationSchema.index(
  { careerId: 1, email: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "CareerApplication",
  careerApplicationSchema
);
