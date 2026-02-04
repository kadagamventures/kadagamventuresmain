const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [String],

    featuredImage: {
      type: String, // S3 key
      required: true,
    },

    ogImage: {
      type: String, // S3 key
    },

    isRecommended: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: [String],
    },

    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
