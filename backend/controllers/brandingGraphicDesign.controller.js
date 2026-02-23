const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/brandingGraphicDesign.service");
const schema = require("../validations/brandingGraphicDesign.joi");

// CREATE / UPSERT
exports.createOrUpdateBranding = asyncHandler(async (req, res, next) => {
  const { error } = schema.createBrandingSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const result = await service.upsertBranding(req.body);

  res.json({
    success: true,
    message: "Branding & Graphic Design saved successfully",
    data: result,
  });
});

// PUBLIC GET
exports.getBranding = asyncHandler(async (req, res, next) => {
  const data = await service.getBranding();
  if (!data) return next(new AppError("Service not found", 404));

  res.json({ success: true, data });
});

// UPDATE FULL
exports.updateBranding = asyncHandler(async (req, res, next) => {
  const updated = await service.updateBranding(req.body);
  if (!updated) return next(new AppError("Service not found", 404));

  res.json({
    success: true,
    message: "Service updated successfully",
    data: updated,
  });
});

// DELETE FULL
exports.deleteBranding = asyncHandler(async (req, res) => {
  await service.deleteBranding();

  res.json({
    success: true,
    message: "Branding & Graphic Design deleted successfully",
  });
});

// ADD PRICING PLAN
exports.addPricingPlan = asyncHandler(async (req, res) => {
  const updated = await service.addPricingPlan(req.body);

  res.json({
    success: true,
    message: "Pricing plan added",
    data: updated,
  });
});

// UPDATE PRICING PLAN
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

// DELETE PRICING PLAN
exports.deletePricingPlan = asyncHandler(async (req, res, next) => {
  const updated = await service.deletePricingPlan(req.params.planId);

  if (!updated) return next(new AppError("Plan not found", 404));

  res.json({
    success: true,
    message: "Pricing plan deleted",
  });
});
