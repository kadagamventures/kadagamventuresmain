const mongoose = require("mongoose");

const workTogetherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    projectDetails: {
      type: String,
      required: true,
      minlength: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkTogether", workTogetherSchema);
