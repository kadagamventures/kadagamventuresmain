const Branding = require("../models/brandingGraphicDesign.model");

// UPSERT
exports.upsertBranding = async (data) => {
  return Branding.findOneAndUpdate(
    { slug: "branding-graphic-design" },
    data,
    { upsert: true, new: true }
  );
};

// PUBLIC GET
exports.getBranding = async () => {
  return Branding.findOne({
    slug: "branding-graphic-design",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateBranding = async (data) => {
  return Branding.findOneAndUpdate(
    { slug: "branding-graphic-design" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteBranding = async () => {
  return Branding.findOneAndDelete({
    slug: "branding-graphic-design",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return Branding.findOneAndUpdate(
    { slug: "branding-graphic-design" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return Branding.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return Branding.findOneAndUpdate(
    { slug: "branding-graphic-design" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
