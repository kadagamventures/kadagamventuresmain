const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/uiUxDesigning.service");
const schema = require("../validations/uiUxDesigning.joi");

// CREATE / UPSERT
exports.createOrUpdateUiUx = asyncHandler(async (req, res, next) => {
  const { error } = schema.createUiUxSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const result = await service.upsertUiUx(req.body);

  res.json({
    success: true,
    message: "UI / UX Designing saved successfully",
    data: result,
  });
});

// PUBLIC GET
exports.getUiUx = asyncHandler(async (req, res, next) => {
  const data = await service.getUiUx();
  if (!data) return next(new AppError("Service not found", 404));

  res.json({ success: true, data });
});

// UPDATE FULL
exports.updateUiUx = asyncHandler(async (req, res, next) => {
  const updated = await service.updateUiUx(req.body);
  if (!updated) return next(new AppError("Service not found", 404));

  res.json({
    success: true,
    message: "Service updated successfully",
    data: updated,
  });
});

// DELETE FULL
exports.deleteUiUx = asyncHandler(async (req, res) => {
  await service.deleteUiUx();
  res.json({
    success: true,
    message: "UI / UX Designing deleted successfully",
  });
});

// ADD PLAN
exports.addPricingPlan = asyncHandler(async (req, res, next) => {
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
