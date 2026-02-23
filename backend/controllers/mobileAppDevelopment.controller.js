const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const service = require("../services/mobileAppDevelopment.service");
const schema = require("../validations/mobileAppDevelopment.joi");

// ADMIN – CREATE / UPSERT
exports.createOrUpdateMobileApp = asyncHandler(async (req, res, next) => {
  const { error } = schema.createMobileAppSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const result = await service.upsertMobileApp(req.body);

  res.json({
    success: true,
    message: "Mobile App Development saved successfully",
    data: result,
  });
});

// PUBLIC – GET
exports.getMobileApp = asyncHandler(async (req, res, next) => {
  const data = await service.getMobileApp();

  if (!data) return next(new AppError("Service not found", 404));

  res.json({ success: true, data });
});

// ADMIN – UPDATE FULL DOCUMENT
exports.updateMobileApp = asyncHandler(async (req, res, next) => {
  const updated = await service.updateMobileApp(req.body);

  if (!updated) {
    return next(new AppError("Service not found", 404));
  }

  res.json({
    success: true,
    message: "Service updated successfully",
    data: updated,
  });
});

// ADMIN – DELETE FULL DOCUMENT
exports.deleteMobileApp = asyncHandler(async (req, res) => {
  await service.deleteMobileApp();

  res.json({
    success: true,
    message: "Mobile App Development deleted successfully",
  });
});


// ADMIN – ADD PRICING PLAN
exports.addPricingPlan = asyncHandler(async (req, res, next) => {
    const { error } = schema.pricingPlanSchema.validate(req.body);
  
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
  
    const updated = await service.addPricingPlan(req.body);
  
    if (!updated) {
      return next(new AppError("Service not found", 404));
    }
  
    res.status(201).json({
      success: true,
      message: "Pricing plan added successfully",
      data: updated.pricingPlans,
    });
  });
  
  

// ADMIN – UPDATE PRICING PLAN
exports.updatePricingPlan = asyncHandler(async (req, res, next) => {
  const updated = await service.updatePricingPlan(
    req.params.planId,
    req.body
  );

  if (!updated) {
    return next(new AppError("Pricing plan not found", 404));
  }

  res.json({
    success: true,
    message: "Pricing plan updated",
    data: updated,
  });
});

// ADMIN – DELETE PRICING PLAN
exports.deletePricingPlan = asyncHandler(async (req, res, next) => {
  const updated = await service.deletePricingPlan(req.params.planId);

  if (!updated) {
    return next(new AppError("Pricing plan not found", 404));
  }

  res.json({
    success: true,
    message: "Pricing plan deleted",
    data: updated,
  });
});
