const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const CompanyUpdate = require("../models/companyUpdate.model");
const broadcastService = require("../services/subscriberBroadcast.service");
const { uploadToS3 } = require("../utils/s3");

exports.createUpdate = asyncHandler(async (req, res, next) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return next(new AppError("Title and message are required", 400));
  }

  let pdfKey = null;

  if (req.file) {
    pdfKey = await uploadToS3({
      file: req.file,
      folder: "company-updates/pdfs",
    });
  }

  const update = await CompanyUpdate.create({
    title,
    message,
    pdfKey,
  });

  if (update.isPublished) {
    await broadcastService.sendUpdateToSubscribers(update);
  }

  res.status(201).json({
    success: true,
    message: "Company update created and sent",
    data: update,
  });
});

exports.getUpdates = asyncHandler(async (req, res) => {
    const updates = await CompanyUpdate.find({ isPublished: true })
      .sort({ createdAt: -1 });
  
    res.json({
      success: true,
      data: updates,
    });
  });

exports.getAllUpdates = asyncHandler(async (req, res) => {
  const updates = await CompanyUpdate.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: updates,
  });
});

