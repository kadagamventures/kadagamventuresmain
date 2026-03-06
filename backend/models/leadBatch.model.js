const mongoose = require("mongoose");

const leadBatchSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
      trim: true,
    },

    totalLeads: {
      type: Number,
      required: true,
      min: 0,
    },

    leadGeneratedDate: {
      type: Date,
      required: true,
    },

    source: {
      type: String, // Facebook, Google Ads, Website, etc.
      default: "Unknown",
    },

    campaignName: {
      type: String,
    },

    costPerLead: {
      type: Number,
    },

    totalCost: {
      type: Number,
    },

    fileKey: {
      type: String, // S3 file key
    },

    fileName: {
      type: String,
    },

    fileSize: {
      type: Number,
    },

    notes: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeadBatch", leadBatchSchema);