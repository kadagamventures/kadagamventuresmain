const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/websiteDevelopment.service");
const schema = require("../validations/websiteDevelopment.joi");

/* ADMIN – CREATE / UPSERT */
exports.createOrUpdateWebsite = asyncHandler(async (req, res, next) => {
  const { error } = schema.createWebsiteSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const data = await service.upsertWebsite(req.body);

  res.json({
    success: true,
    message: "Website Development saved successfully",
    data,
  });
});

/* PUBLIC – GET */
exports.getWebsite = asyncHandler(async (req, res, next) => {
  const data = await service.getWebsite();
  if (!data) return next(new AppError("Service not found", 404));

  res.json({ success: true, data });
});

/* ADMIN – UPDATE FULL DOCUMENT */
exports.updateWebsite = asyncHandler(async (req, res, next) => {
  const updated = await service.updateWebsite(req.body);
  if (!updated)
    return next(new AppError("Service not found", 404));

  res.json({
    success: true,
    message: "Website Development updated successfully",
    data: updated,
  });
});

/* ADMIN – DELETE FULL DOCUMENT */
exports.deleteWebsite = asyncHandler(async (req, res) => {
  await service.deleteWebsite();

  res.json({
    success: true,
    message: "Website Development deleted successfully",
  });
});

/* ADMIN – ADD PRICING PLAN */
exports.addPricingPlan = asyncHandler(async (req, res, next) => {
  const { error } = schema.pricingPlanSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const updated = await service.addPricingPlan(req.body);

  res.status(201).json({
    success: true,
    message: "Pricing plan added successfully",
    data: updated.pricingPlans,
  });
});

/* ADMIN – UPDATE PRICING PLAN */
exports.updatePricingPlan = asyncHandler(async (req, res, next) => {
  const updated = await service.updatePricingPlan(
    req.params.planId,
    req.body
  );

  if (!updated)
    return next(new AppError("Pricing plan not found", 404));

  res.json({
    success: true,
    message: "Pricing plan updated successfully",
    data: updated,
  });
});

/* ADMIN – DELETE PRICING PLAN */
exports.deletePricingPlan = asyncHandler(async (req, res, next) => {
  const updated = await service.deletePricingPlan(req.params.planId);

  if (!updated)
    return next(new AppError("Pricing plan not found", 404));

  res.json({
    success: true,
    message: "Pricing plan deleted successfully",
    data: updated,
  });
});
