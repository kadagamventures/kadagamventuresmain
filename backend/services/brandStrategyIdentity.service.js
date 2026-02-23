const BrandStrategy = require("../models/brandStrategyIdentity.model");

// UPSERT
exports.upsertService = async (data) => {
  return BrandStrategy.findOneAndUpdate(
    { slug: "brand-strategy-identity" },
    data,
    { upsert: true, new: true }
  );
};

// PUBLIC GET
exports.getService = async () => {
  return BrandStrategy.findOne({
    slug: "brand-strategy-identity",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return BrandStrategy.findOneAndUpdate(
    { slug: "brand-strategy-identity" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteService = async () => {
  return BrandStrategy.findOneAndDelete({
    slug: "brand-strategy-identity",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return BrandStrategy.findOneAndUpdate(
    { slug: "brand-strategy-identity" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return BrandStrategy.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return BrandStrategy.findOneAndUpdate(
    { slug: "brand-strategy-identity" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
