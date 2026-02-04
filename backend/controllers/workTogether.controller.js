const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const schema = require("../validations/workTogether.joi");
const service = require("../services/workTogether.service");
const emailService = require("../services/workTogetherEmail.service");

// POST – Submit form
exports.createRequest = asyncHandler(async (req, res, next) => {
  const { error } = schema.createWorkTogetherSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const saved = await service.createRequest(req.body);

  await emailService.sendAdminEmail(saved);
  await emailService.sendUserConfirmation(
    saved.email,
    saved.firstName
  );

  res.status(201).json({
    success: true,
    message: "Your request has been submitted successfully",
  });
});

// ADMIN – Get all requests
exports.getAllRequests = asyncHandler(async (req, res) => {
  const data = await service.getAllRequests();

  res.json({
    success: true,
    count: data.length,
    data,
  });
});
