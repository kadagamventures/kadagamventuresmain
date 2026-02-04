const mongoose = require("mongoose");

const companyUpdateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    pdfKey: {
      type: String, // S3 key
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CompanyUpdate",
  companyUpdateSchema
);
