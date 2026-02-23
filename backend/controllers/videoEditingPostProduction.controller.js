const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/videoEditingPostProduction.service");
const schema = require("../validations/videoEditingPostProduction.joi");

// CREATE / UPSERT
exports.createOrUpdate = asyncHandler(async (req, res, next) => {
  const { error } = schema.createVideoEditingSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const result = await service.upsertService(req.body);

  res.json({
    success: true,
    message: "Video Editing & Post-Production saved successfully",
    data: result,
  });
});

// PUBLIC GET
exports.getService = asyncHandler(async (req, res, next) => {
  const data = await service.getService();
  if (!data) return next(new AppError("Service not found", 404));

  res.json({ success: true, data });
});

// UPDATE FULL
exports.updateService = asyncHandler(async (req, res, next) => {
  const updated = await service.updateService(req.body);
  if (!updated) return next(new AppError("Service not found", 404));

  res.json({
    success: true,
    message: "Service updated successfully",
    data: updated,
  });
});

// DELETE FULL
exports.deleteService = asyncHandler(async (req, res) => {
  await service.deleteService();

  res.json({
    success: true,
    message: "Service deleted successfully",
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
    data: updated,
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
