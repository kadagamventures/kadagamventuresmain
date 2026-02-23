const Service = require("../models/videoEditingPostProduction.model");

// UPSERT
exports.upsertService = async (data) => {
  return Service.findOneAndUpdate(
    { slug: "video-editing-post-production" },
    data,
    { upsert: true, new: true }
  );
};

// PUBLIC GET
exports.getService = async () => {
  return Service.findOne({
    slug: "video-editing-post-production",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return Service.findOneAndUpdate(
    { slug: "video-editing-post-production" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteService = async () => {
  return Service.findOneAndDelete({
    slug: "video-editing-post-production",
  });
};

// ADD PLAN
exports.addPricingPlan = async (plan) => {
  return Service.findOneAndUpdate(
    { slug: "video-editing-post-production" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PLAN
exports.updatePricingPlan = async (planId, data) => {
  return Service.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PLAN
exports.deletePricingPlan = async (planId) => {
  return Service.findOneAndUpdate(
    { slug: "video-editing-post-production" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
