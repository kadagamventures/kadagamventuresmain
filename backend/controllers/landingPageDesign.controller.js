const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/landingPageDesign.service");
const schema = require("../validations/landingPageDesign.joi");

// CREATE / UPSERT
exports.createOrUpdateLandingPage = asyncHandler(async (req, res, next) => {
  const { error } = schema.createLandingPageSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const result = await service.upsertLandingPage(req.body);

  res.json({
    success: true,
    message: "Landing Page Design saved successfully",
    data: result,
  });
});

// PUBLIC GET
exports.getLandingPage = asyncHandler(async (req, res, next) => {
  const data = await service.getLandingPage();
  if (!data) return next(new AppError("Service not found", 404));

  res.json({ success: true, data });
});

// UPDATE FULL
exports.updateLandingPage = asyncHandler(async (req, res, next) => {
  const updated = await service.updateLandingPage(req.body);
  if (!updated) return next(new AppError("Service not found", 404));

  res.json({
    success: true,
    message: "Service updated successfully",
    data: updated,
  });
});

// DELETE FULL
exports.deleteLandingPage = asyncHandler(async (req, res) => {
  await service.deleteLandingPage();
  res.json({
    success: true,
    message: "Landing Page Design deleted successfully",
  });
});

// ADD PLAN
exports.addPricingPlan = asyncHandler(async (req, res) => {
  const updated = await service.addPricingPlan(req.body);
  res.json({
    success: true,
    message: "Pricing plan added",
    data: updated,
  });
});

// UPDATE PLAN
exports.updatePricingPlan = asyncHandler(async (req, res, next) => {
  const updated = await service.updatePricingPlan(
    req.params.planId,
    req.body
  );
  if (!updated) return next(new AppError("Plan not found", 404));

  res.json({
    success: true,
    message: "Pricing plan updated",
  });
});

// DELETE PLAN
exports.deletePricingPlan = asyncHandler(async (req, res, next) => {
  const updated = await service.deletePricingPlan(req.params.planId);
  if (!updated) return next(new AppError("Plan not found", 404));

  res.json({
    success: true,
    message: "Pricing plan deleted",
  });
});
