const VideoProduction = require("../models/videoProduction.model");

// UPSERT
exports.upsertService = async (data) => {
  return VideoProduction.findOneAndUpdate(
    { slug: "video-production" },
    data,
    { upsert: true, new: true }
  );
};

// PUBLIC GET
exports.getService = async () => {
  return VideoProduction.findOne({
    slug: "video-production",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return VideoProduction.findOneAndUpdate(
    { slug: "video-production" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteService = async () => {
  return VideoProduction.findOneAndDelete({
    slug: "video-production",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return VideoProduction.findOneAndUpdate(
    { slug: "video-production" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return VideoProduction.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return VideoProduction.findOneAndUpdate(
    { slug: "video-production" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
